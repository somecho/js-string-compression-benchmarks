const benchmark = require('./benchmark.js')

const tests = benchmark.algorithms.map(algorithm => {
	return benchmark.data.map(d => {
		return {
			it: `ensures ${d.title} is reversible by ${algorithm.title}`,
			compress: algorithm.encode,
			decompress: algorithm.decode,
			source: d.source
		}
	})
}).flat()

function reversible(compress, decompress, source) {
	const encoded = compress(source)
	const decoded = decompress(encoded)
	expect(decoded).toBe(source)
}

tests.forEach(t => {
	it(t.it, () => reversible(t.compress, t.decompress, t.source))
})
