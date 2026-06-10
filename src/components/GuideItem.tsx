import Image from 'next/image'

type Props = {
  name: string
  icon?: string
}

export default function GuideItem({ name, icon }: Props) {
  const src = icon && icon.length > 0 ? icon : '/assets/items/placeholder.png'
  return (
    <div className="bg-black/40 border border-white/6 rounded-lg p-3 flex flex-col items-center text-center">
      <div className="w-14 h-14 mb-2 relative">
        {/* Use next/image but fall back to img if necessary */}
        <img src={src} alt={name} className="w-14 h-14 object-cover rounded-md" />
      </div>
      <div className="text-sm text-gray-200">{name}</div>
    </div>
  )
}
