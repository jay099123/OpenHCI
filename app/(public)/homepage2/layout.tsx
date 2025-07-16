export default function HomepageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-orange-100 flex flex-col">
      {/* Status Bar */}
      <div className="flex justify-between items-center px-4 py-2 text-black text-sm font-medium">
        <div className="flex items-center space-x-1">
          <span>9:41</span>
        </div>
        <div className="flex items-center space-x-1">
          {/* Signal bars */}
          <div className="flex space-x-1">
            <div className="w-1 h-2 bg-black rounded-full"></div>
            <div className="w-1 h-3 bg-black rounded-full"></div>
            <div className="w-1 h-4 bg-black rounded-full"></div>
            <div className="w-1 h-4 bg-black rounded-full"></div>
          </div>
          {/* WiFi icon */}
          <svg className="w-4 h-4" fill="black" viewBox="0 0 24 24">
            <path d="M1,9L23,9C21.32,10.68 19.13,12 16.5,12C13.87,12 11.68,10.68 10,9H1V9M10,9L14,9C15.31,10.31 17.19,11 19,11C20.81,11 22.69,10.31 24,9V11C22.69,12.31 20.81,13 19,13C17.19,13 15.31,12.31 14,11L10,11V9M5,13V11H9V13H5Z"/>
          </svg>
          {/* Battery icon */}
          <div className="relative">
            <div className="w-6 h-3 border border-black rounded-sm">
              <div className="w-4 h-2 bg-black rounded-sm m-0.5"></div>
            </div>
            <div className="absolute -right-0.5 top-1 w-0.5 h-1 bg-black rounded-full"></div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {children}
      </div>

      {/* Bottom Navigation */}
      <div className="bg-gray-800 mx-4 mb-4 rounded-full px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left icon */}
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </button>
          
          {/* Center plus button */}
          <button className="bg-white rounded-full p-3 text-gray-800">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
          </button>
          
          {/* Right icon */}
          <button className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Home indicator */}
      <div className="flex justify-center pb-2">
        <div className="w-32 h-1 bg-gray-600 rounded-full"></div>
      </div>
    </div>
  )
}