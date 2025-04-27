const MessageSkeleton = () => {
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto space-y-4">
      <div className="flex flex-col space-y-4 p-4">
        {skeletonMessages.map((_, index) => {
          const isUser = index % 2 !== 0;
          return (
            <div
              key={index}
              className={`flex items-start space-x-2 p-1 ${
                isUser ? 'self-end flex-row-reverse space-x-reverse' : 'self-start'
              }`}
            >
              <div className="w-8 h-8 rounded-full bg-gray-300 animate-pulse" />
              <div className="flex flex-col space-y-1.5">
                <div className="h-3 w-16 bg-gray-300 rounded animate-pulse" />
                <div className="h-8 w-[200px] bg-gray-300 rounded-lg animate-pulse" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MessageSkeleton;
