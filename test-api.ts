const url =
  "http://api.taboola.com/1.0/json/taboola-templates/recommendations.get" +
  "?app.type=desktop" +
  "&app.apikey=f9040ab1b9c802857aa783c469d0e0ff7e7366e4" +
  "&count=4" +
  "&source.type=video" +
  "&source.id=demo123" +
  "&source.url=https://example.com";

fetch(url)
  .then(res => {
    console.log("status:", res.status);
    return res.json();
  })
  .then(data => {
    // Use JSON.stringify to see full nested structure
    console.log("data:", JSON.stringify(data, null, 2));
    
    // Or inspect specific fields
    if (data.list && data.list.length > 0) {
      console.log("\n--- First item details ---");
      const firstItem = data.list[0];
      console.log("Categories:", firstItem.categories);
      console.log("Thumbnail:", firstItem.thumbnail);
    }
  })
  .catch(err => {
    console.error("error:", err);
  });
