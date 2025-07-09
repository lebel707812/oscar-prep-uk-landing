import React, { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, PlayCircle, PauseCircle, Volume2, VolumeX } from "lucide-react";

interface VideoEmbedProps {
  title: string;
  videoUrl: string;
  description: string;
  onComplete: () => void;
  isCompleted: boolean;
  duration?: string; // e.g., "5:30"
}

const VideoEmbed: React.FC<VideoEmbedProps> = ({
  title,
  videoUrl,
  description,
  onComplete,
  isCompleted,
  duration = "Unknown"
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [watchTime, setWatchTime] = useState(0);
  const [hasWatchedMost, setHasWatchedMost] = useState(isCompleted);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMuteToggle = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      const duration = videoRef.current.duration;
      
      setWatchTime(currentTime);
      
      // Mark as completed if watched 80% of the video
      if (duration && currentTime / duration >= 0.8 && !hasWatchedMost) {
        setHasWatchedMost(true);
        onComplete();
      }
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (!hasWatchedMost) {
      setHasWatchedMost(true);
      onComplete();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const getVideoId = (url: string) => {
    // Extract YouTube video ID from various URL formats
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const isYouTubeUrl = videoUrl.includes('youtube.com') || videoUrl.includes('youtu.be');
  const videoId = isYouTubeUrl ? getVideoId(videoUrl) : null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <PlayCircle className="h-6 w-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline">
            Duration: {duration}
          </Badge>
          {hasWatchedMost && (
            <Badge className="bg-green-100 text-green-800 border-green-200">
              <CheckCircle className="h-3 w-3 mr-1" />
              Completed
            </Badge>
          )}
        </div>
      </div>

      {/* Video Player */}
      <Card>
        <CardContent className="p-0">
          <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
            {isYouTubeUrl && videoId ? (
              // YouTube Embed
              <iframe
                src={`https://www.youtube.com/embed/${videoId}?enablejsapi=1&origin=${window.location.origin}`}
                title={title}
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                onLoad={() => {
                  // YouTube iframe API would be needed for proper tracking
                  // For now, we'll mark as completed when iframe loads
                  setTimeout(() => {
                    if (!hasWatchedMost) {
                      setHasWatchedMost(true);
                      onComplete();
                    }
                  }, 30000); // Mark complete after 30 seconds
                }}
              />
            ) : (
              // HTML5 Video Player
              <video
                ref={videoRef}
                className="w-full h-full"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnd}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
                controls
              >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            
            {/* Custom Controls Overlay (for HTML5 video) */}
            {!isYouTubeUrl && (
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between bg-black bg-opacity-50 rounded-lg p-2">
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handlePlayPause}
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  >
                    {isPlaying ? (
                      <PauseCircle className="h-5 w-5" />
                    ) : (
                      <PlayCircle className="h-5 w-5" />
                    )}
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={handleMuteToggle}
                    className="text-white hover:bg-white hover:bg-opacity-20"
                  >
                    {isMuted ? (
                      <VolumeX className="h-5 w-5" />
                    ) : (
                      <Volume2 className="h-5 w-5" />
                    )}
                  </Button>
                </div>
                
                <div className="text-white text-sm">
                  {formatTime(watchTime)} / {duration}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Video Description */}
      {description && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">About This Video</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 whitespace-pre-line">{description}</p>
          </CardContent>
        </Card>
      )}

      {/* Learning Notes */}
      <Card className="bg-yellow-50 border-yellow-200">
        <CardHeader>
          <CardTitle className="text-lg text-yellow-900">Learning Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="text-yellow-800 space-y-2 text-sm">
            <li>• Take notes while watching to reinforce key concepts</li>
            <li>• Pause the video to reflect on important points</li>
            <li>• Consider rewatching sections that cover complex topics</li>
            <li>• Think about how this content applies to clinical practice</li>
          </ul>
        </CardContent>
      </Card>

      {/* Completion Button */}
      <div className="flex justify-center">
        <Button
          onClick={() => {
            if (!hasWatchedMost) {
              setHasWatchedMost(true);
              onComplete();
            }
          }}
          disabled={hasWatchedMost}
          className={hasWatchedMost ? "bg-green-600 hover:bg-green-600" : ""}
        >
          {hasWatchedMost ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Video Completed
            </>
          ) : (
            "Mark Video as Watched"
          )}
        </Button>
      </div>
    </div>
  );
};

export default VideoEmbed;

