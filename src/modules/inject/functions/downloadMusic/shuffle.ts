const shuffle = (input: string, seed: number): number[] => {
    const length = input.length;
    const result: number[] = [];
    if (length) {
        seed = Math.abs(seed);
        for (let i = length; i--; ) {
            seed = (length * (i + 1) ^ seed + i) % length;
            result[i] = seed;
        }
    }
    return result;
}

export default shuffle;