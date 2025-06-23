export function getRawFileUrl(
  repoUrl: string,
  branch: string,
  filePath: string,
) {
  const repoPath = repoUrl
    .replace("https://github.com/", "")
    .replace(/\.git$/, "")
  return `https://raw.githubusercontent.com/${repoPath}/${branch}/${filePath}`
}

export async function getFilesList(
  repoUrl: string,
  branch: string,
  path: string,
) {
  const repoPath = repoUrl
    .replace("https://github.com/", "")
    .replace(/\.git$/, "")
  const apiUrl = `https://api.github.com/repos/${repoPath}/contents/${path}?ref=${branch}`

  const res = await fetch(apiUrl)
  if (!res.ok) {
    throw new Error(
      `Failed to fetch files list: ${res.status} ${res.statusText}`,
    )
  }

  const data = await res.json()
  return data
    .filter((item: any) => item.type === "file")
    .map((item: any) => ({
      title: item.name,
      value: item.name,
      description: item.path,
    }))
}
