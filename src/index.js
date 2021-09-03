/**
 *
 * @param {int} duration
 * @param args
 * @returns {Promise<void>}
 */
export default function wait(duration, ...args) {
    if (duration instanceof Function) {
        return wait.condition(duration, ...args);
    }

    return new Promise((resolve) => setTimeout(resolve, duration));
}

/**
 * This callback is displayed as a global member.
 * @callback ConditionCallback
 * @param {int} iteration
 * @return {Promise|Boolean}
 */

/**
 *
 * @param {ConditionCallback} condition
 * @param {int} duration
 * @param {int} [maxIterations]
 * @returns {Promise<void>}
 */
export const condition = wait.condition = async function condition(condition, duration, maxIterations) {
    let i      = 0;
    let result = Boolean(await condition(i));

    while (result === false) {
        i++;

        await wait(duration);
        result = Boolean(await condition(i));

        if (result === false && maxIterations !== undefined && i >= maxIterations) {
            throw new Error('Condition never succeeded in iteration interval');
        }
    }
}

/**
 *
 * @returns {Promise<void>}
 */
export const later = wait.later = function later() {
    return wait(0);
}
