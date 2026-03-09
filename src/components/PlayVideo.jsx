import React, { useEffect, useState, useContext } from 'react';
import "./PlayVideo.css";
import like from "../assets/like.png";
import dislike from "../assets/dislike.png";
import share from "../assets/share.png";
import save from "../assets/save.png";
import moment from 'moment';
import { Context } from '../store/context';
import { useNavigate } from 'react-router-dom';

export const PlayVideo = ({ VideoId }) => {
  const { API_KEY, value_converter, setWatchHistory } = useContext(Context);
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const videoDetails_url = `https://youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${VideoId}&key=${API_KEY}`;
        const res = await fetch(videoDetails_url);
        
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setApiData(data.items[0]);

        setWatchHistory(prev => {
          const isAlreadyInHistory = prev.some(video => video.id === data.items[0].id);
          return isAlreadyInHistory ? prev : [...prev, data.items[0]];
        }); 

      } catch (error) {
        console.error("Video Data Fetch Error:", error.message);
        navigate("/error");
      }

      try {
        const comment_url = `https://youtube.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${VideoId}&key=${API_KEY}`;
        const commentRes = await fetch(comment_url);

        if (!commentRes.ok) {
          throw new Error(`HTTP error! Status: ${commentRes.status}`);
        }

        const commentData = await commentRes.json();
        setCommentData(commentData.items);
        
      } catch (error) {
        console.error("Comment Data Fetch Error:", error.message);
        navigate("/error");
      }
    };

    fetchVideoData();
  }, [VideoId]);

  useEffect(() => {
    const fetchChannelData = async () => {
      if (apiData) {
        try {
          const channelData_url = `https://youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
          const res = await fetch(channelData_url);

          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }

          const response = await res.json();
          setChannelData(response.items[0]);

        } catch (error) {
          console.error("Channel Data Fetch Error:", error.message);
          navigate("/error");
        }
      }
    };

    fetchChannelData();
  }, [apiData]);

  return (
    <div className="play-video">
      <iframe src={`https://www.youtube.com/embed/${VideoId}?autoplay=1`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
      <h3>{apiData ? apiData.snippet.title : "Title here"}</h3>
      <div className="play-video-info">
        <p>{apiData ? value_converter(apiData.statistics.viewCount) : "16k"} views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}</p>
        <div className="like-share flex">
          <span className='flex'><img src={like} alt="Like" />{apiData ? value_converter(apiData.statistics.likeCount) : 155}</span>
          <span className='flex'><img src={dislike} alt="Dislike" /></span>
          <span className='flex'><img src={share} alt="Share" />12</span>
          <span className='flex'><img src={save} alt="Save" />12</span>
        </div>
      </div>
      <div className="publisher flex">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ""} alt="Channel" />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ""}</p>
          <span>{channelData ? value_converter(channelData.statistics.subscriberCount) : ""} Subscribers</span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description : ""}</p>
        <h4>{apiData ? value_converter(apiData.statistics.commentCount) : ""} Comments</h4>
        {commentData ? (
          commentData.map((item, index) => (
            <div key={index} className="comment">
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="Comment Author" />
              <div className="comment-text">
                <h3>
                  {item.snippet.topLevelComment.snippet.authorDisplayName}
                  <span>{moment(item.snippet.topLevelComment.snippet.publishedAt).fromNow()}</span>
                </h3>
                <p dangerouslySetInnerHTML={{ __html: item.snippet.topLevelComment.snippet.textDisplay }} />
                <div className="like-dislike">
                  <span>
                    <img loading='lazy' src={like} alt="Like" />
                    {value_converter(item.snippet.topLevelComment.snippet.likeCount)}
                  </span>
                  <img src={dislike} alt="Dislike" />
                </div>
              </div>
            </div>
          ))
        ) : null}
      </div>
    </div>
  );
};
