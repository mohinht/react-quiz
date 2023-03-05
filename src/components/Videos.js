import { useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import useVideoList from "../hooks/useVideoList";
import Video from "./Video";

export default function Videos() {
  const [page, setPage] = useState(1);

  const { loading, error, videos, hasMore } = useVideoList(page);
  return (
    <div>
      {videos.length > 0 && (
        <InfiniteScroll
          dataLength={videos.length}
          hasMore={hasMore}
          loader="Loading..."
          next={() => setPage(page + 8)}
        >
          {videos.map((video, i) =>
            video.noq > 0 ? (
              <Link
                to={`/quiz/${video.youtubeID}`}
                state={{ videoTitle: video.title }}
                key={video.youtubeID + i}
              >
                <Video
                  id={video.youtubeID}
                  title={video.title}
                  noq={video.noq}
                />
              </Link>
            ) : (
              <Video
                key={video.youtubeID + i}
                id={video.youtubeID}
                title={video.title}
                noq={video.noq}
              />
            )
          )}
        </InfiniteScroll>
      )}
      {!loading && videos.length === 0 && <div> No Data Found!</div>}
      {error && <div> There was an error!</div>}
      {loading && <div>Loading</div>}
    </div>
  );
}
