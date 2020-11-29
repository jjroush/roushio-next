export default async function handler(req, res) {
  const response = await fetch(
    "https://www.hy-vee.com/aisles-online/version"
  ).then((res) => res.json());

  console.log(global);
  console.log("response", response);
  res.statusCode = 200;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({ name: "John Doe" }));
}
