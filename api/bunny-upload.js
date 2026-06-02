export default async function handler(req, res) {

if(req.method !== "POST"){
return res.status(405).json({error:"Method not allowed"});
}

try {

const { title } = req.body;

const response = await fetch(
`https://video.bunnycdn.com/library/${process.env.BUNNY_LIBRARY_ID}/videos`,
{
method:"POST",
headers:{
"AccessKey": process.env.BUNNY_API_KEY,
"Content-Type":"application/json"
},
body: JSON.stringify({
title: title || "ifon video"
})
}
);

const data = await response.json();

return res.status(200).json({
videoId: data.guid
});

} catch(err){
return res.status(500).json({
error: err.message
});
}

}