export function truncateText(text, maxPos) {
	if (!text) {
		return text;
	}
	if (text.length > maxPos) {
		text = text.substring(0, text.lastIndexOf(" ", maxPos)) + "...";
	}

	return text;
}
