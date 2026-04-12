function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <div className="w-8 h-8 border-2 border-gray-200 border-t-black rounded-full animate-spin" />
      <p className="mt-4 text-xs text-gray-400 uppercase tracking-widest font-bold">
        Checking ingredients...
      </p>
    </div>
  )
}

export default Loading