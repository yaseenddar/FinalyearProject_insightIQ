
const ChatLoading = () => {
  return (
    <div className="p-6 max-w-xs mx-auto bg-white rounded-md shadow-md">
    {/* First skeleton */}
    <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-shimmer mb-4"></div>
    <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-shimmer mb-4"></div>
    <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-shimmer mb-4"></div>
    <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-shimmer mb-4"></div>
    <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-shimmer mb-4"></div>
    <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-shimmer mb-4"></div>
    <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-shimmer mb-4"></div>
    <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-shimmer mb-4"></div>
    <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-shimmer mb-4"></div>

    {/* Second skeleton with animation */}
    <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md animate-shimmer mb-4"></div>

    {/* Third skeleton without animation */}
    <div className="h-8 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 rounded-md mb-4"></div>
  </div>
          
  );
};

export default ChatLoading;
