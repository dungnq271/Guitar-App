// adapted from https://gist.github.com/0x263b/2bdd90886c2036a1ad5bcf06d6e6fb37
export const nameToColour = (name: string) => {
  name = name.toUpperCase();
  let hash = 0;
  if (name.length === 0) return hash;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  let color = '#';
  for (let i = 0; i < 3; i++) {
    let value = (hash >> (i * 8)) & 255;
    color += ('00' + value.toString(16)).substring(2);
  }
  return color;
};
