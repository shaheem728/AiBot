const GOOGLE_API_KEY = import.meta.env.GOOGLE_API_KEY 
const API_URL =`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GOOGLE_API_KEY}`

export async function generateResponse() {

    try{
      const response = await fetch(API_URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body:JSON.stringify(
            {
                "contents": [{
                  "parts":[
                    {"text": "Tell me about this instrument"},
                    {
                      "inline_data": {
                        "mime_type":"image/jpeg",
                        "data": ""
                      }
                    }
                  ]
                }]
              }
        ),
      })
    }catch{

    }
    
}