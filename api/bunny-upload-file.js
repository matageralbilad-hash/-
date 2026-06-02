export default async function handler(req, res) {

if(req.method !== "POST"){
return res.status(405).json({error:"Method not allowed"});
}

try {

const { videoId } = req.body;
const file = req.body.file;

const response = await fetch(
`https://video.bunnycdn.com/library/${process.env.BUNNY_LIBRARY_ID}/videos/${videoId}`,
{
method:"PUT",
headers:{
"AccessKey": process.env.BUNNY_API_KEY
},
body: file
}
);

return res.status(200).json({
success:true
});

} catch(err){
return res.status(500).json({
error: err.message
});
}

}