import React, { useEffect } from "react";
import _ from "lodash";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import Divider from "@mui/material/Divider";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import parse from "html-react-parser";
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";

import { styled } from "@mui/material/styles";

const CardContainer = styled(Card)(() => ({
	height: "100%",
}));

const CardMediaContainer = styled(CardMedia)(() => ({
	height: 0,
	paddingTop: "56.25%", // 16:9
}));

const CardContentContainer = styled(CardContent)(() => ({
	width: "100%",
	height: "100%",
	overflowY: "scroll",
}));

const IFrameContent = styled("iframe")(() => ({
	overflow: "hidden",
	overflowX: "hidden",
	overflowY: "hidden",
	width: "100%",
	border: "none",
}));

const FMHtmlComponent = ({ options, removeMessage, handleError }) => {
	const { vfs } = vfsFonts.pdfMake;
	pdfMake.vfs = vfs;

	useEffect(() => {
		try {
			if (options?.toPDF && typeof options?.content !== "string") {
				let documentContent = _.cloneDeep(options.content);
				if (options?.content?.footer?.stack[0]?.table?.body[0]) {
					documentContent.footer = (currentPage, pageCount) => {
						return {
							margin: [40, 0, 40, 0],
							stack: [
								{
									style: "tableExample",
									table: {
										widths: ["*"],
										body: [
											[
												{
													text:
														"Page " +
														currentPage.toString() +
														" of " +
														pageCount,
													alignment: "right",
													style: "normalText",
													fontSize: 8,
												},
											],
											...options.content.footer.stack[0].table.body.slice(1),
										],
									},
									layout: "noBorders",
								},
							],
						};
					};
				}
				pdfMake
					.createPdf(documentContent)
					.download(
						options?.content?.info?.fileName ||
						options?.content?.info?.title ||
						options?.title ||
						"pdffile.pdf"
					);
				removeMessage();
			}
		} catch (error) {
			handleError(error);
			removeMessage();
		}
	}, []);

	return (
		<CardContainer>
			<CardHeader title={parse("")} />
			<Divider />
			{options?.image && (
				<CardMediaContainer image={options?.image} title={options?.title} />
			)}
			{options?.content && (
				<CardContentContainer>
					{typeof options?.content === "string" && parse(options?.content)}
				</CardContentContainer>
			)}
			{options?.embedded && (
				<CardContentContainer style={{ overflow: "hidden" }}>
					<IFrameContent
						src={options?.url}
						title={options?.title}
						allow="camera *;microphone *; display-capture; autoplay; clipboard-write; notifications"
						style={{ height: options.height ? `${options.height}px` : "70vh" }}
						frameBorder={"0"}
						allowFullScreen
						height="100vh"
						width="100%"
					/>
				</CardContentContainer>
			)}
		</CardContainer>
	);
};

export default FMHtmlComponent;
