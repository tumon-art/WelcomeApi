import dbConnect from '../../lib/dbConnect'
import SavedIp from '../../models/savedIp'



export default async function handler(req, res) {
  const { method } = req


  await dbConnect()

  // GET DATE & TIME
  var dateNtime = new Date().toLocaleString('en-US',{timeZone:'Asia/Dhaka'}).split(",");
  var time = dateNtime[1].split(' ')[1]
  var date = dateNtime[0]
  // GET IP 
  var getIp = await fetch('https://jsonip.com', { mode: 'cors' })
  var ip = await getIp.json()

  let data = {
    ip:ip.ip,
    date:date,
    time:time,
    visit: 1,
  }

  switch (method) {
    case 'GET':
      try { 

        const response = await SavedIp.findOne({ip:data.ip}).exec()
        
        if(response) { 
          response.visit = response.visit + 1;
          await response.save()
          res.status(400).json({ success: false, data: ip.ip })
        } else {
          const response = await SavedIp.create(data)
          res.status(200).json({ success: true, data: "noted!" })
        }

      } catch (error) {
        res.status(400).json({ success: false })
      }
      break
    case 'POST':
      // try {
      //   const data = await SavedIp.create(
      //     req.body
      //   ) /* create a new model in the database */
      //   res.status(201).json({ success: true, data: data })
      // } catch (error) {
      //   res.status(400).json({ success: false })
      // }
      break
    default:
      res.status(400).json({ success: false })
      break
  }
}