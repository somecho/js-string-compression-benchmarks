import LZMA from './LZMA.mjs'
import LZString from './LZString.mjs'
import lzw from './lzw.mjs'
import ULZSS from './ULZSS.mjs'
import sketch from './sketch.mjs'
import simplexNoise from './simplexNoise.mjs'
import triangle from './triangle.mjs'

function compress(s, fn) {
	const encoder = new TextEncoder();
	const encoded = encoder.encode(fn(s))
	return btoa(
		Array(encoded.length)
			.fill('')
			.map((_, i) => String.fromCharCode(encoded[i]))
			.join('')
	);
}

function decompress(s, fn) {
	const binaryString = atob(s)
	let bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i)
	}
	const decoder = new TextDecoder();
	const decoded = decoder.decode(bytes.buffer)
	return fn(decoded)
}

function benchmark(opts) {
	const length = opts.source.length;
	const encoded = opts.compressFn(opts.source);
	const encodedLength = encoded.length;
	const ratio = Math.floor(encodedLength / length * 10000.0) / 100.0;

	console.log(`${opts.title} - ${opts.compressionMethod}`)
	console.log(`${opts.title} uncompressed length: ${length} chars`)
	console.log(`Compressed length: ${encodedLength} chars`)
	console.log(`Compression ratio: ${ratio}%\n`)

	return encodedLength;
}

const benchmarks = [
	{
		title: "Sketch",
		compressionMethod: "no compression",
		source: sketch,
		compressFn: btoa
	},
	{
		title: "Simplex Noise",
		compressionMethod: "no compression",
		source: simplexNoise,
		compressFn: btoa
	},
	{
		title: "Triangle.js",
		compressionMethod: "no compression",
		source: triangle,
		compressFn: btoa
	},
	{
		title: "Sketch",
		compressionMethod: "ULZSS compression",
		source: sketch,
		compressFn: (s) => compress(s, ULZSS.encode)
	},
	{
		title: "Simplex Noise",
		compressionMethod: "ULZSS compression",
		source: simplexNoise,
		compressFn: (s) => compress(s, ULZSS.encode)
	},
	{
		title: "Triangle.js",
		compressionMethod: "ULZSS compression",
		source: triangle,
		compressFn: (s) => compress(s, ULZSS.encode)
	},
	{
		title: "Sketch",
		compressionMethod: "LZString compression",
		source: sketch,
		compressFn: (s) => compress(s, LZString.compress)
	},
	{
		title: "Simplex Noise",
		compressionMethod: "LZString compression",
		source: simplexNoise,
		compressFn: (s) => compress(s, LZString.compress)
	},
	{
		title: "Triangle.js",
		compressionMethod: "LZString compression",
		source: triangle,
		compressFn: (s) => compress(s, LZString.compress)
	},
	{
		title: "Sketch",
		compressionMethod: "LZMA compression",
		source: sketch,
		compressFn: (s) => compress(s, LZMA.compress)
	},
	{
		title: "Simplex Noise",
		compressionMethod: "LZMA compression",
		source: simplexNoise,
		compressFn: (s) => compress(s, LZMA.compress)
	},
	{
		title: "Triangle.js",
		compressionMethod: "LZMA compression",
		source: triangle,
		compressFn: (s) => compress(s, LZMA.compress)
	},
	{
		title: "Sketch",
		compressionMethod: "LZW compression",
		source: sketch,
		compressFn: (s) => compress(s, lzw.decode)
	},
	{
		title: "Simplex Noise",
		compressionMethod: "LZW compression",
		source: simplexNoise,
		compressFn: (s) => compress(s, lzw.decode)
	},
	{
		title: "Triangle.js",
		compressionMethod: "LZW compression",
		source: triangle,
		compressFn: (s) => compress(s, lzw.decode)
	},
]

benchmarks.forEach(b => {
	// benchmark(b)
})
