export interface TomlifyOptions {
  indent?: false | string;
  delims?: false | string;
}

export default function tomlify(obj: any, opts: TomlifyOptions);
