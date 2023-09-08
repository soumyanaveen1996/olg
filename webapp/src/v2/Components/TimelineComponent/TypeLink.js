import * as React from "react";
import Box from "@mui/material/Box";
import {
	LinkTitleText,
	LinkSubTitleText,
	LinkCardContent,
	LinkMainBox,
	LinkCard,
	LinkMedia,
	LinkFooter,
} from "./styles";

const TypeLink = ({ item }) => {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				marginBottom: "10px",
				marginTop: "10px",
			}}
		>
			{item?.links.map((i) => {
				return (
					<a href={i} target="_blank">
						{i}
					</a>
				);
			})}
		</div>
		// <LinkCard>
		// 	<LinkMedia
		// 		component="img"
		// 		image="https://picsum.photos/seed/picsum/200/300"
		// 		alt="Live from space album cover"
		// 	/>
		// 	<LinkMainBox>
		// 		<LinkCardContent>
		// 			<LinkTitleText component="div" variant="h5">
		// 				Title lorem ipsum dolor sit amet consectetur adipiscin elit sed
		// 				aliqua dolor
		// 			</LinkTitleText>
		// 			<LinkSubTitleText
		// 				variant="subtitle1"
		// 				color="text.secondary"
		// 				component="div"
		// 			>
		// 				Sunt in culpa qui officia deserunt mollit anim id est laborum.
		// 			</LinkSubTitleText>
		// 		</LinkCardContent>
		// 		<Box sx={{ display: "flex", alignItems: "center" }}>
		// 			<LinkFooter
		// 				variant="subtitle1"
		// 				color="text.secondary"
		// 				component="div"
		// 			>
		// 				frontm.com
		// 			</LinkFooter>
		// 		</Box>
		// 	</LinkMainBox>
		// </LinkCard>
	);
};

export default TypeLink;
