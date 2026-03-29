import { useEffect, useState } from 'react'
import { supabase } from "../../supabase";
import { Award, Upload, Trash2, ImageIcon, Plus } from 'lucide-react'

const Card = ({ children, className = '' }) => (
  <div className={`relative group ${className}`}>
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] rounded-2xl blur opacity-10 group-hover:opacity-25 transition duration-500" />
    <div className="relative bg-white/5 backdrop-blur-xl border border-white/12 rounded-2xl h-full">
      {children}
    </div>
  </div>
)

const SkeletonCard = () => (
  <div className="relative">
    <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] rounded-2xl blur opacity-10" />
    <div className="relative bg-white/5 border border-white/12 rounded-2xl overflow-hidden">
      <div className="w-full aspect-[16/11.5] bg-white/5 animate-pulse" />
    </div>
  </div>
)

const CertCard = ({ cert, onDelete }) => {
  const [imgLoaded, setImgLoaded] = useState(false)
  const [imgError, setImgError] = useState(false)
  
  return (
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] rounded-2xl blur opacity-10 group-hover:opacity-30 transition duration-500" />
      <div className="relative bg-white/5 border border-white/12 rounded-2xl overflow-hidden">
        {!imgLoaded && !imgError && <div className="w-full aspect-[16/11.5] bg-white/5 animate-pulse" />}
        
        {!imgError ? (
          <img
            src={cert.img}
            alt="Pengalaman"
            onLoad={() => setImgLoaded(true)}
            onError={() => setImgError(true)}
            className={`w-full aspect-[16/11.5] object-cover group-hover:scale-105 transition-transform duration-500 ${imgLoaded ? 'block' : 'hidden'}`}
          />
        ) : (
          <div className="w-full aspect-[16/11.5] bg-red-500/10 flex flex-col items-center justify-center">
            <ImageIcon className="w-8 h-8 text-red-400 mb-2" />
            <p className="text-xs text-red-400">Gambar error</p>
          </div>
        )}
        
        {cert.description && (
          <div className="p-3">
            <p className="text-gray-300 text-xs leading-relaxed">{cert.description}</p>
          </div>
        )}
        
        {/* Tombol hapus - SELALU muncul */}
        <div className="absolute top-2 right-2">
          <button
            onClick={() => onDelete(cert.id)}
            className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-red-500/20 border border-red-500/30 text-red-300 text-xs hover:bg-red-500/30 transition-colors"
          >
            <Trash2 className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default function Certificates() {
  const [certs, setCerts] = useState([])
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [description, setDescription] = useState('')
  const [uploading, setUploading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const [loading, setLoading] = useState(true)

  const fetchCerts = async () => {
    setLoading(true)
    const { data } = await supabase.from('certificates').select('*').order('created_at', { ascending: false })
    setCerts(data || [])
    setLoading(false)
  }

  useEffect(() => { fetchCerts() }, [])

  const handleFile = (f) => {
    if (!f) return
    
    // Validasi format file
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!allowedTypes.includes(f.type)) {
      alert('Format tidak didukung! Gunakan JPG, PNG, atau WEBP')
      return
    }
    
    setFile(f)
    if (preview) URL.revokeObjectURL(preview)
    setPreview(URL.createObjectURL(f))
  }

  const uploadImage = async () => {
    if (!file) return
    setUploading(true)
    const fileExt = file.name.split('.').pop()
    const fileName = `cert-${Date.now()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage.from('certificate-images').upload(fileName, file)
    if (uploadError) {
      console.error('Upload error:', uploadError)
      alert('Upload gagal: ' + uploadError.message)
      setUploading(false)
      return
    }
    
    const { data } = supabase.storage.from('certificate-images').getPublicUrl(fileName)
    const { error: insertError } = await supabase.from('certificates').insert({ img: data.publicUrl, description: description })
    
    if (insertError) {
      console.error('Insert error:', insertError)
      alert('Gagal menyimpan: ' + insertError.message)
    } else {
      fetchCerts()
      setFile(null)
      setPreview(null)
      setDescription('')
    }
    setUploading(false)
  }

  const deleteCert = async (id) => {
    if (!confirm('Hapus pengalaman ini?')) return
    await supabase.from('certificates').delete().eq('id', id)
    fetchCerts()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] rounded-xl blur opacity-50" />
          <div className="relative w-9 h-9 bg-[#030014] rounded-xl border border-white/15 flex items-center justify-center">
            <Award className="w-4 h-4 text-blue-400" />
          </div>
        </div>
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-white">Pengalaman</h1>
          <p className="text-gray-500 text-xs">
            {loading ? 'Loading...' : `${certs.length} pengalaman total`}
          </p>
        </div>
      </div>

      <Card>
        <div className="p-5 sm:p-6 space-y-4">
          <h2 className="text-sm font-semibold text-white flex items-center gap-2">
            <Plus className="w-4 h-4 text-blue-400" /> Tambah Pengalaman
          </h2>

          <label
            htmlFor="file-upload"
            onDragOver={e => { e.preventDefault(); setDragOver(true) }}
            onDragLeave={() => setDragOver(false)}
            onDrop={e => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]) }}
            className={`flex flex-col items-center justify-center w-full min-h-[160px] rounded-xl border-2 border-dashed cursor-pointer transition-all duration-300 ${
              dragOver ? 'border-blue-400/60 bg-blue-500/10' : 'border-white/12 bg-white/4 hover:border-blue-500/35 hover:bg-white/7'
            }`}
          >
            {preview ? (
              <img src={preview} alt="preview" className="max-h-40 object-contain rounded-lg p-2" />
            ) : (
              <div className="text-center space-y-2 p-6">
                <div className="w-11 h-11 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mx-auto">
                  <ImageIcon className="w-5 h-5 text-blue-400" />
                </div>
                <p className="text-sm text-gray-300">Drag & drop atau klik untuk upload foto</p>
                <p className="text-xs text-gray-600">PNG, JPG, WEBP supported</p>
              </div>
            )}
          </label>
          
          <input 
            id="file-upload"
            type="file" 
            accept="image/jpeg,image/jpg,image/png,image/webp" 
            onChange={e => handleFile(e.target.files[0])} 
            className="hidden" 
          />

          <textarea
            value={description}
            onChange={e => setDescription(e.target.value)}
            placeholder="Deskripsi singkat pengalaman ini... (opsional)"
            className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm text-gray-300 placeholder-gray-600 focus:outline-none focus:border-blue-500/50 resize-none h-24"
          />

          {file && (
            <div className="flex items-center justify-between gap-3 flex-wrap">
              <p className="text-xs text-gray-400 truncate flex-1">{file.name}</p>
              <div className="flex gap-2 shrink-0">
                <button onClick={() => { setFile(null); setPreview(null); setDescription('') }}
                  className="px-3 py-1.5 rounded-xl border border-white/10 text-gray-500 hover:text-white text-xs transition-colors">
                  Clear
                </button>
                <button onClick={uploadImage} disabled={uploading} className="relative group/u">
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-[#1d4ed8] to-[#0ea5e9] rounded-xl opacity-60 blur group-hover/u:opacity-100 transition duration-300" />
                  <div className="relative flex items-center gap-2 px-4 py-1.5 bg-[#030014] rounded-xl border border-white/10">
                    {uploading ? <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" /> : <Upload className="w-3.5 h-3.5 text-blue-400" />}
                    <span className="text-xs text-gray-200">{uploading ? 'Uploading...' : 'Upload'}</span>
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : certs.length === 0 ? (
        <Card>
          <div className="p-16 text-center">
            <Award className="w-10 h-10 text-gray-700 mx-auto mb-3" />
            <p className="text-gray-500 text-sm">Belum ada pengalaman.</p>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
          {certs.map(cert => <CertCard key={cert.id} cert={cert} onDelete={deleteCert} />)}
        </div>
      )}
    </div>
  )
}