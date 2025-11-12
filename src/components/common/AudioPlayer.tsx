import React from "react";

type AudioPlayerProps = {
	src?: string;
	autoPlay?: boolean;
};

const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, autoPlay = false }) => {
	return (
		<div>
			<audio controls data-testid="audio-element" autoPlay={autoPlay}>
				{src && <source src={src} />}
				Your browser does not support the audio element.
			</audio>
		</div>
	);
};

export default AudioPlayer;

