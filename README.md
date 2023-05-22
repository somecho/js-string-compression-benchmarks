# JavaScript String Compression Benchmarks
A repo to test the compression ratio (not performance!) of JavaScript client side string compression for encoding in the URL. The flow looks like this:
```
string --> compress(string) --> toBase64(compressedString)
```
The ratio is then measured by the length of the compressed base64 string. To run the benchmarks, run `yarn benchmark`. To run tests, run `yarn test`.

## Results

|                | sketch  | simplex noise | triangle |
|----------------|---------|---------------|----------|
| no compression | 1320    | 2936          | 9112     |
| base 64        | 1760    | 3916          | 12152    |
| ratio          | 133.33% | 133.37%       | 133.36%  |
| u-lzss         | 1276    | 2768          | 5224     |
| ratio          | 96.66%  | 94.27%        | 57.33%   |
| LZString       | 1100    | 2244          | 4876     |
| ratio          | 83.33%  | 76.43%        | 53.51%   |
| LZW            | 1404    | 2968          | 6936     |
| ratio          | 106.36% | 101.08%       | 76.11%   |

## Algorithms
1. [u-lzss](https://code.google.com/archive/p/u-lzss/)
2. [lz-string](https://github.com/pieroxy/lz-string)
3. [LZW](https://gist.github.com/revolunet/843889)

## NOTE!
The u-lzss algorithm by Google is buggy! With large strings, the second half of the string becomes malformed. It passes only 2/3 tests. 
