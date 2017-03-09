export default function TextMagic(str) {
	var result = str
		.replace(/\| */g, "\n")
		.replace(/\[Link: (.*)\]/g, "<a href='$1'>$1</a>");

	return {__html: result };
}
