class DescriptiveStats {
    constructor(data) {
        this.data = data;
    }

    // Measures of Central Tendency
    mean() {
        return this.data.reduce((a, b) => a + b, 0) / this.data.length;
    }

    median() {
        const sorted = [...this.data].sort((a, b) => a - b);
        const mid = Math.floor(sorted.length / 2);

        return sorted.length % 2 !== 0 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
    }

    mode() {
        const counts = this.data.reduce((acc, val) => {
            acc[val] = (acc[val] || 0) + 1;
            return acc;
        }, {});

        const maxCount = Math.max(...Object.values(counts));
        return Object.keys(counts).filter(k => counts[k] === maxCount);
    }

    // Measures of Dispersion
    range() {
        return Math.max(...this.data) - Math.min(...this.data);
    }

    variance() {
        const mean = this.mean();
        return this.data.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / this.data.length;
    }

    standardDeviation() {
        return Math.sqrt(this.variance());
    }

    quartile(q) {
        const sorted = [...this.data].sort((a, b) => a - b);
        const pos = (sorted.length - 1) * q;

        const base = Math.floor(pos);
        const rest = pos - base;

        if (sorted[base + 1] !== undefined) {
            return sorted[base] + rest * (sorted[base + 1] - sorted[base]);
        } else {
            return sorted[base];
        }
    }

    interquartileRange() {
        return this.quartile(0.75) - this.quartile(0.25);
    }
}

// Usage:
const stats = new DescriptiveStats([1, 2, 3, 4, 5, 6, 7, 8, 9]);
console.log('Mean:', stats.mean());
console.log('Median:', stats.median());
console.log('Mode:', stats.mode());
console.log('Range:', stats.range());
console.log('Variance:', stats.variance());
console.log('Standard Deviation:', stats.standardDeviation());
console.log('First Quartile:', stats.quartile(0.25));
console.log('Third Quartile:', stats.quartile(0.75));
console.log('Interquartile Range:', stats.interquartileRange());
