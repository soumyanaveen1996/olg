import * as React from "react";
import Stack from "@mui/material/Stack";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
	CarouselImage,
	CarouselContainer,
	CarouselVideo,
	CarouselIconButtonNext,
	CarouselIconButtonPrev,
} from "./styles";

const TypeGallery = ({ item }) => {
	const { gallery } = item;

	return (
		<Stack sx={{ marginBottom: "30px" }}>
			{gallery?.length > 1 ? (
				<CarouselContainer
					defaultControlsConfig={{
						pagingDotsContainerClassName: "dots",
						pagingDotsClassName: "singleDot",
					}}
					renderCenterLeftControls={({ previousDisabled, previousSlide }) => (
						<CarouselIconButtonPrev
							onClick={previousSlide}
							disabled={previousDisabled}
						>
							<ArrowBackIosIcon />
						</CarouselIconButtonPrev>
					)}
					renderCenterRightControls={({ nextDisabled, nextSlide }) => (
						<CarouselIconButtonNext onClick={nextSlide} disabled={nextDisabled}>
							<ArrowForwardIosIcon />
						</CarouselIconButtonNext>
					)}
				>
					{gallery &&
						gallery?.map((i) => {
							return i?.type === "image"
								? i?.imageFileUrl?.signedUrl && (
										<CarouselImage src={`${i?.imageFileUrl?.signedUrl}`} />
								  )
								: i?.type === "video" && i?.imageFileUrl?.signedUrl && (
										<CarouselVideo width="400" height="200" controls>
											<source src={`${i?.imageFileUrl?.signedUrl}`} />
											Your browser does not support the video tag.
										</CarouselVideo>
								  );
						})}
				</CarouselContainer>
			) : gallery && gallery[0]?.type === "image" ? (
				gallery[0]?.imageFileUrl?.signedUrl && (
					<CarouselImage src={`${gallery[0]?.imageFileUrl?.signedUrl}`} />
				)
			) : (
				gallery[0]?.type === "video" &&
				gallery[0]?.imageFileUrl?.signedUrl && (
					<CarouselVideo width="400" controls>
						<source src={`${gallery[0]?.imageFileUrl?.signedUrl}`} />
						Your browser does not support the video tag.
					</CarouselVideo>
				)
			)}
		</Stack>
	);
};

export default TypeGallery;
