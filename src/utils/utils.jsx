
  import prettier from "prettier/standalone";
import parserBabel from "prettier/parser-babel";

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const getNonNullValue = (value) => {
  if (value != "") {
    return value;
  } else {
    return undefined;
  }
};

export function filterEmptyFields(object) {
  Object.keys(object).forEach((key) => {
    if (empty(object[key])) {
      delete object[key];
    }
  });
  return object;
}

export function empty(value) {
  return (
    value === "" ||
    value === null ||
    value === undefined ||
    value === "undefined"
  );
}

export const isImage = (file) => {
  const validImageTypes = ["image/gif", "image/jpeg", "image/jpg", "image/png"];
  if (validImageTypes.includes(file.file.type)) return true;
  return false;
};

export const isVideo = (file) => {
  const validVideoTypes = ["video/webm", "video/mp4"];
  if (validVideoTypes.includes(file.file.type)) return true;
  return false;
};

export const isPdf = (file) => {
  const validVideoTypes = ["application/pdf"];
  if (validVideoTypes.includes(file.file.type)) return true;
  return false;
};

export const randomString = (length) => {
  let result = "";
  let characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const generateUUID = () => {
  const s4 = () => {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  };

  return (
    s4() +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    "-" +
    s4() +
    s4() +
    s4()
  );
};

export const capitalize = (string) => {
  const removedSpecialCharacters = string.replace(/[^a-zA-Z0-9]/g, " ");

  const splitWords = removedSpecialCharacters.split(" ").filter(Boolean);

  const capitalized = splitWords.map(
    (dt) => `${ dt[0].toUpperCase() }${ dt.substring(1) } `
  );

  return capitalized.join(" ");
};

export const dateHandle = (date) => {
  const newDate = date
    ? new Date(date).toISOString().split("T")[0]
    : new Date().toISOString().split("T")[0];
  return newDate;
};

export const ghrapDate = (date) => {
  const newDate = new Date(date);
  var mS = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];
  console.log(newDate.getDate(), mS[newDate.getMonth()]);

  return `${ newDate.getDate() } ${ mS[newDate.getMonth()] } `;
};

export const formatCode = function (code) {
  return prettier.format(code, {
    parser: "babel",
    plugins: [parserBabel],
    singleQuote: true,
    trailingComma: "es5",
    jsxSingleQuote: true,
    printWidth: 80,
    tabWidth: 2,
  });
};

export const slugify = (str) =>
  str
    .toLowerCase()
    .trim()
    .replace(/[^ws-]/g, "")
    .replace(/[s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");

/**
 * @typedef {Object} StringCaserOptions
 * @property {"space" | String} separator - define what separates each word, undefined returns no separation - passing "space" separates the words by a space
 * @property {"uppercase" | "lowercase" | "capitalize" | "camelCase" | "PascalCase"} casetype - text case type, uppercase, lowercase of capitalized | default is lowercase
 */
/**
 *
 * @param {String} string - text to convert
 * @param {StringCaserOptions} options - options
 * @returns
 */
export const StringCaser = (string, options) => {
  if (!string) return null;
  if (typeof string !== "string") return null;
  const removedSpecialCharacters = string.replace(/[^a-zA-Z0-9]/g, " ");
  let casedText = [];
  const splitWords = removedSpecialCharacters.split(" ").filter(Boolean);

  if (options?.casetype === "capitalize") {
    casedText = splitWords.map(
      (/** @type {string} */ dt) => `${ dt[0].toUpperCase() }${ dt.substring(1) } `
    );
  }
  if (options?.casetype === "uppercase") {
    casedText = splitWords.map((/** @type {string} */ dt) => dt.toUpperCase());
  }
  if (options?.casetype === "lowercase") {
    casedText = splitWords.map((/** @type {string} */ dt) => dt.toLowerCase());
  }
  if (options?.casetype === "camelCase") {
    casedText = splitWords.map((/** @type {string} */ dt, index) =>
      index === 0
        ? dt.toLowerCase()
        : `${ dt[0].toUpperCase() }${ dt.substring(1) } `
    );
  }
  if (options?.casetype === "PascalCase") {
    casedText = splitWords.map(
      (/** @type {string} */ dt) => `${ dt[0].toUpperCase() }${ dt.substring(1) }`
    );
  }

  if (options?.separator) {
    if (options?.separator === "space") {
      return casedText.join(" ");
    } else {
      return casedText.join(options?.separator);
    }
  } else {
    return casedText.join("");
  }
};

export const testColumns = [
  {
    header: "Action",
    show: true,
    accessor: "",
  },

  {
    header: "Id",
    accessor: "id",
    show: false,
    isSorted: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },

  {
    header: "User Id",
    accessor: "user_id",
    show: false,
    isSorted: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },

  {
    header: "First Name",
    accessor: "first_name",
    show: true,
    isSorted: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },

  {
    header: "Last Name",
    accessor: "last_name",
    show: true,
    isSorted: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "Email",
    accessor: "email",
    show: true,
    isSorted: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "Role",
    accessor: "role",
    show: true,
    isSorted: false,
    isSortedDesc: false,
    mappingExist: true,
    mappings: {
      admin: "Admin",
      employee: "Employee",
    },
  },
  {
    header: "Photo",
    accessor: "photo",
    show: true,
    isSorted: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "Phone",
    accessor: "phone",
    show: true,
    isSorted: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
  {
    header: "Status",
    accessor: "status",
    show: false,
    isSorted: false,
    isSortedDesc: false,
    mappingExist: true,
    mappings: { 0: "pending", 1: "approved" },
  },
  {
    header: "Type",
    accessor: "type",
    show: false,
    isSorted: false,
    isSortedDesc: false,
    mappingExist: true,
    mappings: {
      0: "normal",
      1: "facebook",
      2: "google",
    },
  },
  {
    header: "Verify",
    accessor: "verify",
    show: false,
    isSorted: false,
    isSortedDesc: false,
    mappingExist: true,
    mappings: {
      0: "not verified",
      1: "verified",
    },
  },

  {
    header: "Create At",
    accessor: "create_at",
    show: false,
    isSorted: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },

  {
    header: "Update At",
    accessor: "update_at",
    show: false,
    isSorted: false,
    isSortedDesc: false,
    mappingExist: false,
    mappings: {},
  },
];


export const exceptionalHtmlElements = [
  "audio",
  "image",
  "img",
  "heading",
  "video",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "br",
  "a",
  "p",
  "link",
  "span",
];
export const excludedHtmlElements = [
  "abbr",
  "address",
  "area",
  "article",
  "aside",
  "b",
  "base",
  "bdi",
  "bdo",
  "blockquote",
  "body",
  "button",
  "canvas",
  "caption",
  "cite",
  "code",
  "col",
  "colgroup",
  "data",
  "datalist",
  "dd",
  "del",
  "details",
  "dfn",
  "dialog",
  "div",
  "dl",
  "dt",
  "em",
  "embed",
  "fieldset",
  "figcaption",
  "figure",
  "footer",
  "form",
  "head",
  "header",
  "hgroup",
  "html",
  "i",
  "iframe",
  "input",
  "ins",
  "kbd",
  "label",
  "legend",
  "li",
  // "link",
  "main",
  "map",
  "mark",
  "meta",
  "meter",
  "nav",
  "noscript",
  "object",
  "ol",
  "optgroup",
  "option",
  "output",
  // "p",
  "param",
  "picture",
  "pre",
  "progress",
  "q",
  "rb",
  "rp",
  "rt",
  "rtc",
  "ruby",
  "s",
  "samp",
  "script",
  "section",
  "select",
  "slot",
  "small",
  "source",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "template",
  "textarea",
  "tfoot",
  "th",
  "thead",
  "time",
  "title",
  "tr",
  "track",
  "u",
  "ul",
  "var",
  "wbr",
]
  