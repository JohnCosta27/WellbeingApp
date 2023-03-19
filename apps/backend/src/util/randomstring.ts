const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
/**
 * Generates a random string, used for password salting.
 *
 * @param size The size of the random string to be generated,
 *        if none is provided, it defaults to 128.
 * @returns the random string
 */
export default function (length?: number): string {
  const size = length ?? 128;
  const characterLength: number = characters.length;
  let out = "";
  for (let i = 0; i < size; i++) {
    out += characters.charAt(Math.floor(Math.random() * characterLength));
  }
  return out;
}
