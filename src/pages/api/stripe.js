import Stripe from "stripe";
// import handler from "./hello";

const stripe = new Stripe(process.env.STRIPE_SECRETE_KEY);





export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const params = {
          submit_type: 'pay',
          mode: 'payment',
          payment_method_types: ['card'],
          billing_address_collection: 'auto',
          shipping_options: [
            { shipping_rate: 'shr_1Mg8M1ET8UwHBRSFlrgxi7gb' },
          ],
          line_items: req.body.map((item) => {
            const img = item.image[0].asset._ref;
            const newImage = img.replace('image-', 'https://cdn.sanity.io/images/o3t1raif/production/').replace('-webp', '.webp');
  
            return {
              price_data: { 
                currency: 'usd',
                product_data: { 
                  name: item.name,
                  images: [newImage],
                },
                unit_amount: item.price * 100,
              },
              adjustable_quantity: {
                enabled:true,
                minimum: 1,
              },
              quantity: item.quantity
            }
          }),
          success_url: `${req.headers.origin}/success`,
          cancel_url: `${req.headers.origin}/canceled`,
        }
  
        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create(params);
  
        res.status(200).json(session);
      } catch (err) {
        res.status(err.statusCode || 500).json(err.message);
      }
    } else {
      res.setHeader('Allow', 'POST');
      res.status(405).end('Method Not Allowed');
    }
  }



// export default async function handler(req, res) {
//   if (req.method === 'POST') {
//     console.log(req.body.cartItem)
//     try {
//       // Create Checkout Sessions from body params.

//        const params = {
//         submit_type:"pay",
//         mode: 'payment',
//         payment_method_types:['card'],
//         billing_address:'auto',
//         shipping_options:[
//             { shipping_rate:"shr_1Mg8M1ET8UwHBRSFlrgxi7gb"},
//             { shipping_rate:"shr_1Mg8O2ET8UwHBRSFaZDl6xUj"}
//         ],
//         line_items: [
//             {
//               // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
//               price: '{{PRICE_ID}}',
//               quantity: 1,
//             },
//           ],
//           mode: 'payment',
//           success_url: `${req.headers.origin}/?success=true`,
//           cancel_url: `${req.headers.origin}/?canceled=true`,
//        }
//       const session = await stripe.checkout.sessions.create(params);
//       res.redirect(303, session.url);
//     } catch (err) {
//       res.status(err.statusCode || 500).json(err.message);
//     }
//   } else {
//     res.setHeader('Allow', 'POST');
//     res.status(405).end('Method Not Allowed');
//   }
// }














// { 
    
//     shipping_rate:"shr_1Mg8M1ET8UwHBRSFlrgxi7gb"},
// { shipping_rate:"shr_1Mg8O2ET8UwHBRSFaZDl6xUj"}