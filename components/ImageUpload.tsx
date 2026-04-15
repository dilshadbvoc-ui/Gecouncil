'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader } from 'lucide-react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
}

export default function ImageUpload({ value, onChange, label = 'Image' }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    if (!file) return;
    setError('');
    setUploading(true);

    const form = new FormData();
    form.append('file', file);

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: form });
      const data = await res.json();
      if (res.ok) {
        onChange(data.url);
      } else {
        setError(data.error || 'Upload failed');
      }
    } catch {
      setError('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const isApiUrl = value?.startsWith('/api/images/');
  const isExternal = value?.startsWith('http');
  const hasImage = value && (isApiUrl || isExternal);

  return (
    <div>
      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.8125rem', fontWeight: '600', color: 'rgba(74,144,217,0.9)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
        {label}
      </label>

      {hasImage ? (
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <img
            src={value}
            alt="Preview"
            style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '10px', border: '2px solid rgba(74,144,217,0.3)', display: 'block' }}
          />
          <button
            type="button"
            onClick={() => onChange('')}
            style={{ position: 'absolute', top: '-8px', right: '-8px', width: '24px', height: '24px', borderRadius: '50%', background: '#ef4444', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={12} />
          </button>
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            style={{ marginTop: '0.5rem', display: 'block', width: '120px', padding: '0.375rem', borderRadius: '6px', background: 'rgba(74,144,217,0.1)', border: '1px solid rgba(74,144,217,0.3)', color: '#4A90D9', cursor: 'pointer', fontSize: '0.75rem', textAlign: 'center' }}
          >
            Change
          </button>
        </div>
      ) : (
        <div
          onClick={() => inputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
          style={{
            width: '100%', padding: '2rem 1rem', borderRadius: '12px',
            border: '2px dashed rgba(74,144,217,0.3)', background: 'rgba(255,255,255,0.03)',
            cursor: uploading ? 'not-allowed' : 'pointer', textAlign: 'center',
            transition: 'border-color 0.2s'
          }}
        >
          {uploading ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: '#4A90D9' }}>
              <Loader size={24} style={{ animation: 'spin 1s linear infinite' }} />
              <span style={{ fontSize: '0.875rem' }}>Uploading...</span>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <Upload size={24} style={{ color: '#4A90D9' }} />
              <span style={{ fontSize: '0.875rem', color: 'rgba(248,249,250,0.7)' }}>Click or drag to upload</span>
              <span style={{ fontSize: '0.75rem', color: 'rgba(248,249,250,0.4)' }}>JPG, PNG, WebP · Max 5MB</span>
            </div>
          )}
        </div>
      )}

      {/* Also allow manual URL input */}
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder="Or paste image URL..."
        style={{ marginTop: '0.5rem', width: '100%', padding: '0.625rem 0.875rem', borderRadius: '8px', border: '1px solid rgba(74,144,217,0.2)', background: 'rgba(255,255,255,0.03)', color: '#F8F9FA', fontSize: '0.8125rem', outline: 'none', boxSizing: 'border-box' }}
      />

      {error && <p style={{ marginTop: '0.375rem', fontSize: '0.75rem', color: '#ef4444' }}>{error}</p>}

      <input ref={inputRef} type="file" accept="image/*" style={{ display: 'none' }} onChange={e => { const f = e.target.files?.[0]; if (f) handleFile(f); }} />

      <style dangerouslySetInnerHTML={{ __html: `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }` }} />
    </div>
  );
}
