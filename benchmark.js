//COMPRESSION
const LZString = require('./compression/LZString.js')
const lzw = require('./compression/lzw.js')
const ULZSS = require('./compression/ULZSS.js')

// DATA
const sketch = require('./data/sketch.js')
const simplexNoise = require('./data/simplexNoise.js')
const triangle = require('./data/triangle.js')

const util = require('./compression/util.js')

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
		compressFn: (s) => util.compress(s, ULZSS.encode)
	},
	{
		title: "Simplex Noise",
		compressionMethod: "ULZSS compression",
		source: simplexNoise,
		compressFn: (s) => util.compress(s, ULZSS.encode)
	},
	{
		title: "Triangle.js",
		compressionMethod: "ULZSS compression",
		source: triangle,
		compressFn: (s) => util.compress(s, ULZSS.encode)
	},
	{
		title: "Sketch",
		compressionMethod: "LZString compression",
		source: sketch,
		compressFn: LZString.compressToBase64
	},
	{
		title: "Simplex Noise",
		compressionMethod: "LZString compression",
		source: simplexNoise,
		compressFn: LZString.compressToBase64
	},
	{
		title: "Triangle.js",
		compressionMethod: "LZString compression",
		source: triangle,
		compressFn: LZString.compressToBase64
	}, {
		title: "Sketch",
		compressionMethod: "LZW compression",
		source: sketch,
		compressFn: (s) => util.compress(s, lzw.encode)
	},
	{
		title: "Simplex Noise",
		compressionMethod: "LZW compression",
		source: simplexNoise,
		compressFn: (s) => util.compress(s, lzw.encode)
	},
	{
		title: "Triangle.js",
		compressionMethod: "LZW compression",
		source: triangle,
		compressFn: (s) => util.compress(s, lzw.encode)
	},
]

benchmarks.forEach(b => {
	benchmark(b)
})
