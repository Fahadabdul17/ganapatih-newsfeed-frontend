import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface FeedItemProps {
  userid: number;
  content: string;
  createdat: string;
}

export default function FeedItem({ userid, content, createdat }: FeedItemProps) {
  return (
    <div className="glass-card p-6 hover:shadow-xl transition-all duration-300 animate-fade-in">
      <div className="flex items-start gap-4">
        {/* Avatar */}
        <div className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-violet-400 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
            {userid}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="mb-2">
            <h3 className="text-white font-semibold">User #{userid}</h3>
            <p className="text-sm text-gray-400">{dayjs(createdat).fromNow()}</p>
          </div>

          {/* Post Content */}
          <p className="text-gray-200 whitespace-pre-wrap break-words">{content}</p>
        </div>
      </div>
    </div>
  );
}
