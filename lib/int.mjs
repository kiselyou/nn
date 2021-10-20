
/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const randomFloat = (min, max) => {
    return Math.random() * (max - min) + min
}

/**
 *
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const randomInt = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min)) + min
}

/**
 *
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const normalize = (value, min, max) => {
    return (value - min) / (max - min)
}

/**
 *
 * @param {number} normalized
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export const denormalize = (normalized, min, max) => {
    return (normalized * (max - min) + min)
}