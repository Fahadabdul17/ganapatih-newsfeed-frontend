import PostComposer from '@/components/PostComposer'
import FeedList from '@/components/FeedList'


export default function FeedPage() {
return (
<div className="grid gap-4">
<PostComposer onPosted={() => location.reload()} />
<FeedList />
</div>
)
}