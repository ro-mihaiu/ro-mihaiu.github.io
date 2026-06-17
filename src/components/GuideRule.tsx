type Props = {
  text: string
  note?: string
}

export default function GuideRule({ text, note }: Props) {
  return (
    <div className="bg-black/30 border border-white/6 rounded-md p-4">
      <div className="flex items-start gap-3">
        <div className="mt-1">
          <span className="inline-block w-3 h-3 rounded-full bg-[#ff5fa2]" />
        </div>
        <div className="flex-1">
          <div className="text-sm text-gray-100 font-medium">{text}</div>
          {note && (
            <div className="mt-2 flex">
              <div className="mr-3">
                <div className="h-full w-0.5 bg-gray-700" />
              </div>
              <div className="text-sm text-gray-300">{note}</div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
