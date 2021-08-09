import fs from "fs";
import path from "path";
import matter from "gray-matter";
// import { get } from "http";

// get post dir
const postDir = path.join(process.cwd(), "posts");

export function getSortedPostData() {
  // get the file name
  const fileNames = fs.readdirSync(postDir);
  // rename file name in the dir
  const allPostData = fileNames.map((item) => {
    let ID = item.replace(/\.md$/, "");

    // get exact file path
    const filePath = path.join(postDir, item);

    // get file content
    const fileContent = fs.readFileSync(filePath, "utf-8");

    // parse file content
    const Data = matter(fileContent);
    console.log({
      ID,
      ...Data.data,
    });

    // return the data content
    return {
      ID,
      ...Data.data,
    };
  });
  // console.log(fileName);

  return allPostData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const fileName = fs.readdirSync(postDir);

  return   fileName.map((item) => {
    return {
      params: {
        id: item.replace(/\.md$/, ''),
      },
    };
  });
}


// the getStaticpaths must return an array tha lools like this
  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       id: 'ssg-ssr'
  //     }
  //   },
  //   {
  //     params: {
  //       id: 'pre-rendering'
  //     }
  //   }
  // ]

  export function getPostData(id) {
    const fullPath = path.join(postDir, `${id}.md`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
  
    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // console.log(id);
  
    // Combine the data with the id
    return {
      id,
      ...matterResult.data
    }
  }