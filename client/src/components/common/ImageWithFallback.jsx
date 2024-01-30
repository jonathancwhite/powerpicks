import { useState } from "react";
import PropTypes from "prop-types";

const ImageWithFallback = ({ src, fallbackSrc, alt }) => {
	const [currentSrc, setCurrentSrc] = useState(src);

	const handleError = () => {
		setCurrentSrc(fallbackSrc);
	};

	return <img src={currentSrc} alt={alt} onError={handleError} />;
};

ImageWithFallback.propTypes = {
	src: PropTypes.string.isRequired,
	fallbackSrc: PropTypes.string.isRequired,
	alt: PropTypes.string,
};

export default ImageWithFallback;
