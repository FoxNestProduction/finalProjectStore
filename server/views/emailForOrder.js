module.exports = (order, products, date) => {
  const { orderNo, deliveryAddress, totalSum, name } = order;
  const {city, street, house} = deliveryAddress;

  const productsHtmlArr = products.map(el => {
    return `<tr style="border-collapse:collapse">
        <td align="left" style="Margin:0;padding-top:5px;padding-bottom:10px;padding-left:20px;padding-right:20px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:178px" valign="top"><![endif]-->
          <table className="es-left" cellSpacing="0" cellPadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
            <tr style="border-collapse:collapse">
              <td className="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:178px">
                <table width="100%" cellSpacing="0" cellPadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                  <tr style="border-collapse:collapse">
                    <td align="center" style="padding:0;Margin:0;font-size:0">
                        <img src="${el.product.imageUrl}" alt="${el.product.name}" className="adapt-img" title="${el.product.name}" width="95" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic">
                    </td>
                  </tr>
                </table></td>
            </tr>
          </table><!--[if mso]></td><td style="width:20px"></td><td style="width:362px" valign="top"><![endif]-->
          <table cellSpacing="0" cellPadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
              <td align="left" style="padding:0;Margin:0;width:362px">
                <table width="100%" cellSpacing="0" cellPadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                  <tr style="border-collapse:collapse">
                    <td align="left" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p>
                      <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%" className="cke_show_border" cellSpacing="1" cellPadding="1" border="0">
                        <tr style="border-collapse:collapse">
                          <td style="padding:0;Margin:0">${el.product.name}</td>
                          <td style="padding:0;Margin:0;width:60px;text-align:center">${el.cartQuantity}</td>
                          <td style="padding:0;Margin:0;width:100px;text-align:center">$${el.product.currentPrice}</td>
                        </tr>
                      </table><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p></td>
                  </tr>
                </table></td>
            </tr>
          </table><!--[if mso]></td></tr></table><![endif]--></td>
      </tr>
    
      <tr style="border-collapse:collapse">
        <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px">
          <table width="100%" cellSpacing="0" cellPadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
            <tr style="border-collapse:collapse">
              <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                <table width="100%" cellSpacing="0" cellPadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                  <tr style="border-collapse:collapse">
                    <td align="center" style="padding:0;Margin:0;padding-bottom:10px;font-size:0">
                      <table width="100%" height="100%" cellSpacing="0" cellPadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                        <tr style="border-collapse:collapse">
                          <td style="padding:0;Margin:0;border-bottom:1px solid #efefef;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td>
                        </tr>
                      </table></td>
                  </tr>
                </table></td>
            </tr>
          </table></td>
      </tr>`
  });

  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html dir="ltr" xmlns="http://www.w3.org/1999/xhtml" xmlns:o="urn:schemas-microsoft-com:office:office" lang="und" style="padding:0;Margin:0">
       <head>
        <meta charset="UTF-8">
        <meta content="width=device-width, initial-scale=1" name="viewport">
        <meta name="x-apple-disable-message-reformatting">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta content="telephone=no" name="format-detection">
        <title>Order</title><!--[if (mso 16)]>
          <style type="text/css">
          a {text-decoration: none;}
          </style>
          <![endif]--><!--[if gte mso 9]><style>sup { font-size: 100% !important; }</style><![endif]--><!--[if gte mso 9]>
      <xml>
          <o:OfficeDocumentSettings>
          <o:AllowPNG></o:AllowPNG>
          <o:PixelsPerInch>96</o:PixelsPerInch>
          </o:OfficeDocumentSettings>
      </xml>
      <![endif]-->
        <style type="text/css">
      #outlook a {
      \tpadding:0;
      }
      .ExternalClass {
      \twidth:100%;
      }
      .ExternalClass,
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td,
      .ExternalClass div {
      \tline-height:100%;
      }
      .es-button {
      \tmso-style-priority:100!important;
      \ttext-decoration:none!important;
      }
      a[x-apple-data-detectors] {
      \tcolor:inherit!important;
      \ttext-decoration:none!important;
      \tfont-size:inherit!important;
      \tfont-family:inherit!important;
      \tfont-weight:inherit!important;
      \tline-height:inherit!important;
      }
      .es-desk-hidden {
      \tdisplay:none;
      \tfloat:left;
      \toverflow:hidden;
      \twidth:0;
      \tmax-height:0;
      \tline-height:0;
      \tmso-hide:all;
      }
      @media only screen and (max-width:600px) {p, ul li, ol li, a { line-height:150%!important } h1, h2, h3, h1 a, h2 a, h3 a { line-height:120%!important } h1 { font-size:30px!important; text-align:center } h2 { font-size:26px!important; text-align:center } h3 { font-size:20px!important; text-align:center } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:30px!important } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:26px!important } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:20px!important } .es-header-body p, .es-header-body ul li, .es-header-body ol li, .es-header-body a { font-size:16px!important } .es-content-body p, .es-content-body ul li, .es-content-body ol li, .es-content-body a { font-size:16px!important } .es-footer-body p, .es-footer-body ul li, .es-footer-body ol li, .es-footer-body a { font-size:16px!important } .es-infoblock p, .es-infoblock ul li, .es-infoblock ol li, .es-infoblock a { font-size:12px!important } *[class="gmail-fix"] { display:none!important } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3 { text-align:center!important } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3 { text-align:right!important } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3 { text-align:left!important } .es-m-txt-r img, .es-m-txt-c img, .es-m-txt-l img { display:inline!important } .es-button-border { display:block!important } a.es-button, button.es-button { font-size:20px!important; display:block!important; border-left-width:0px!important; border-right-width:0px!important } .es-btn-fw { border-width:10px 0px!important; text-align:center!important } .es-adaptive table, .es-btn-fw, .es-btn-fw-brdr, .es-left, .es-right { width:100%!important } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%!important; max-width:600px!important } .es-adapt-td { display:block!important; width:100%!important } .adapt-img { width:100%!important; height:auto!important } .es-m-p0 { padding:0px!important } .es-m-p0r { padding-right:0px!important } .es-m-p0l { padding-left:0px!important } .es-m-p0t { padding-top:0px!important } .es-m-p0b { padding-bottom:0!important } .es-m-p20b { padding-bottom:20px!important } .es-mobile-hidden, .es-hidden { display:none!important } tr.es-desk-hidden, td.es-desk-hidden, table.es-desk-hidden { width:auto!important; overflow:visible!important; float:none!important; max-height:inherit!important; line-height:inherit!important } tr.es-desk-hidden { display:table-row!important } table.es-desk-hidden { display:table!important } td.es-desk-menu-hidden { display:table-cell!important } .es-menu td { width:1%!important } .es-menu-wyimjh8n .es-adapt-td { padding-left:0!important; padding-right:0!important; width:100%!important } .es-menu-wyimjh8n td { border:0!important } .es-menu-wyimjh8n td:not(:last-child) { border-bottom:0px solid rgb(0, 0, 0)!important } table.es-table-not-adapt, .esd-block-html table { width:auto!important } table.es-social { display:inline-block!important } table.es-social td { display:inline-block!important } .es-menu td a { font-size:16px!important } .es-desk-hidden { display:table-row!important; width:auto!important; overflow:visible!important; max-height:inherit!important } }
      </style>
       </head>
       <body data-new-gr-c-s-loaded="14.1136.0" style="width:100%;font-family:arial, 'helvetica neue', helvetica, sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;padding:0;Margin:0">
        <div dir="ltr" class="es-wrapper-color" lang="und" style="background-color:#F9F9F9;"><!--[if gte mso 9]>
      \t\t\t<v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
      \t\t\t\t<v:fill type="tile" color="#efefef" origin="0.5, 0" position="0.5, 0"></v:fill>
      \t\t\t</v:background>
      \t\t<![endif]-->
         <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;padding:0;Margin:0;width:100%;height:100%;background-repeat:repeat;background-position:center top;background-color:#F9F9F9">
           <tr style="border-collapse:collapse">
            <td valign="top" style="padding:0;Margin:0">
             <table cellpadding="0" cellspacing="0" class="es-header" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
               <tr style="border-collapse:collapse">
                <td align="center" style="padding:0;Margin:0">
                 <table class="es-header-body" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#fef5e4;width:600px" cellspacing="0" cellpadding="0" bgcolor="#fef5e4" align="center">
                   <tr style="border-collapse:collapse">
                    <td align="left" bgcolor="#eaeaea" style="Margin:0;padding-left:5px;padding-top:10px;padding-bottom:10px;padding-right:15px;background-color:#eaeaea"><!--[if mso]><table style="width:580px" cellpadding="0" cellspacing="0"><tr><td style="width:81px" valign="top"><![endif]-->
                     <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                       <tr style="border-collapse:collapse">
                        <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:71px">
                         <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr style="border-collapse:collapse">
                            <td class="es-m-p0l es-m-txt-c" align="right" style="padding:0;Margin:0;padding-left:15px;font-size:0px"><a href="https://eatly-fe17.netlify.app/" target="_blank" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#999999;font-size:14px"><img src="https://fcpbcaz.stripocdn.email/content/guids/CABINET_f700d8071d4597cfc85640757ba24800e246b82926950f5e3c9ac2b8a2c46589/images/logo.png" alt="Eatly logo" title="Eatly logo" width="48" style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic"></a></td>
                           </tr>
                         </table></td>
                        <td class="es-hidden" style="padding:0;Margin:0;width:10px"></td>
                       </tr>
                     </table><!--[if mso]></td><td style="width:32px" valign="top"><![endif]-->
                     <table cellspacing="0" cellpadding="0" align="left" class="es-left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                       <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0;width:32px">
                         <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr style="border-collapse:collapse">
                            <td align="center" style="padding:0;Margin:0;padding-top:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:36px;color:#6c5fbc;font-size:18px"><strong>eatly</strong></p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td><td style="width:10px"></td><td style="width:457px" valign="top"><![endif]-->
                       <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                         <tr style="border-collapse:collapse">
                          <td align="left" style="padding:0;Margin:0;width:457px">
                           <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                             <tr style="border-collapse:collapse">
                              <td style="padding:0;Margin:0">
                               <table cellpadding="0" cellspacing="0" width="100%" class="es-menu" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                                 <tr class="links" style="border-collapse:collapse">
                                  <td align="center" valign="top" width="33%" id="esd-menu-id-0" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:12px;padding-bottom:12px;border:0"><a target="_blank" href="https://eatly-fe17.netlify.app/menu" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#333333;font-size:16px">Menu</a></td>
                                  <td align="center" valign="top" width="33%" id="esd-menu-id-1" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:12px;padding-bottom:12px;border:0"><a target="_blank" href="https://eatly-fe17.netlify.app/restaurants" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#333333;font-size:16px">Restaurants</a></td>
                                  <td align="center" valign="top" width="33%" id="esd-menu-id-2" style="Margin:0;padding-left:5px;padding-right:5px;padding-top:12px;padding-bottom:12px;border:0"><a target="_blank" href="https://eatly-fe17.netlify.app/contact" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:none;display:block;font-family:arial, 'helvetica neue', helvetica, sans-serif;color:#333333;font-size:16px">Contact</a></td>
                                 </tr>
                               </table></td>
                             </tr>
                           </table></td>
                         </tr>
                     </table><!--[if mso]></td></tr></table><![endif]--></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
               <tr style="border-collapse:collapse">
                <td align="center" style="padding:0;Margin:0">
                 <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                   <tr style="border-collapse:collapse">
                    <td align="left" style="padding:0;Margin:0">
                     <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr style="border-collapse:collapse">
                        <td align="center" valign="top" style="padding:0;Margin:0;width:600px">
                         <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr style="border-collapse:collapse">
                            <td align="center" style="padding:0;Margin:0;font-size:0px"><img class="adapt-img" src="https://res.cloudinary.com/dvtjgmpnr/image/upload/v1699568990/EatlyProject/emails/thanksEmail_itt981.png" alt style="display:block;border:0;outline:none;text-decoration:none;-ms-interpolation-mode:bicubic" width="600"></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                   <tr style="border-collapse:collapse">
                    <td align="left" style="Margin:0;padding-top:10px;padding-bottom:20px;padding-left:20px;padding-right:20px">
                     <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr style="border-collapse:collapse">
                        <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                         <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;border-radius:0px" width="100%" cellspacing="0" cellpadding="0">
                           <tr style="border-collapse:collapse">
                            <td align="center" style="padding:0;Margin:0;padding-bottom:15px;padding-top:20px"><h1 style="Margin:0;line-height:36px;mso-line-height-rule:exactly;font-family:'trebuchet ms', helvetica, sans-serif;font-size:30px;font-style:normal;font-weight:normal;color:#333333">Your order has been confirmed!</h1></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
               <tr style="border-collapse:collapse">
                <td align="center" style="padding:0;Margin:0">
                 <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                   <tr style="border-collapse:collapse">
                    <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px;padding-bottom:30px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:279px" valign="top"><![endif]-->
                     <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                       <tr style="border-collapse:collapse">
                        <td class="es-m-p20b" align="left" style="padding:0;Margin:0;width:279px">
                         <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#eaeaea;border-color:#efefef;border-width:1px 0px 1px 1px;border-style:solid" width="100%" cellspacing="0" cellpadding="0" bgcolor="#EAEAEA">
                           <tr style="border-collapse:collapse">
                            <td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'trebuchet ms', helvetica, sans-serif;color:#6c5fbc">SUMMARY:</h4></td>
                           </tr>
                           <tr style="border-collapse:collapse">
                            <td align="left" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px">
                             <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%" class="cke_show_border" cellspacing="1" cellpadding="1" border="0" align="left">
                               <tr style="border-collapse:collapse">
                                <td style="padding:0;Margin:0;font-size:14px;line-height:21px">Order #:</td>
                                <td style="padding:0;Margin:0;font-size:14px;line-height:21px">${orderNo}</td>
                               </tr>
                               <tr style="border-collapse:collapse">
                                <td style="padding:0;Margin:0;font-size:14px;line-height:21px">Order Date:</td>
                                <td style="padding:0;Margin:0;font-size:14px;line-height:21px">${date}</td>
                               </tr>
                               <tr style="border-collapse:collapse">
                                <td style="padding:0;Margin:0;font-size:14px;line-height:21px">Order Total:</td>
                                <td style="padding:0;Margin:0;font-size:14px;line-height:21px">$${totalSum}</td>
                               </tr>
                             </table><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px"><br></p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td><td style="width:1px"></td><td style="width:280px" valign="top"><![endif]-->
                     <table class="es-right" cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                       <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0;width:280px">
                         <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:separate;border-spacing:0px;background-color:#eaeaea;border-width:1px;border-style:solid;border-color:#efefef" width="100%" cellspacing="0" cellpadding="0" bgcolor="#EAEAEA">
                           <tr style="border-collapse:collapse">
                            <td align="left" style="Margin:0;padding-bottom:10px;padding-top:20px;padding-left:20px;padding-right:20px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'trebuchet ms', helvetica, sans-serif;color:#6c5fbc">DELIVERY ADDRESS:</h4></td>
                           </tr>
                           <tr style="border-collapse:collapse">
                            <td align="left" style="padding:0;Margin:0;padding-bottom:20px;padding-left:20px;padding-right:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">${name}</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">${street} ${house}</p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">${city}</p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td></tr></table><![endif]--></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table class="es-content" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%">
               <tr style="border-collapse:collapse">
                <td align="center" style="padding:0;Margin:0">
                 <table class="es-content-body" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FFFFFF;width:600px">
                   <tr style="border-collapse:collapse">
                    <td align="left" style="Margin:0;padding-top:10px;padding-bottom:10px;padding-left:20px;padding-right:20px"><!--[if mso]><table style="width:560px" cellpadding="0" cellspacing="0"><tr><td style="width:245px" valign="top"><![endif]-->
                     <table class="es-left" cellspacing="0" cellpadding="0" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                       <tr style="border-collapse:collapse">
                        <td class="es-m-p0r es-m-p20b" valign="top" align="center" style="padding:0;Margin:0;width:245px">
                         <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr style="border-collapse:collapse">
                            <td align="left" style="padding:0;Margin:0;padding-left:20px"><h4 style="Margin:0;line-height:120%;mso-line-height-rule:exactly;font-family:'trebuchet ms', helvetica, sans-serif">DISHES ORDERED</h4></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td><td style="width:20px"></td><td style="width:295px" valign="top"><![endif]-->
                     <table cellspacing="0" cellpadding="0" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr style="border-collapse:collapse">
                        <td align="left" style="padding:0;Margin:0;width:295px">
                         <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr style="border-collapse:collapse">
                            <td align="left" style="padding:0;Margin:0">
                             <table style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:100%" class="cke_show_border" cellspacing="1" cellpadding="1" border="0">
                               <tr style="border-collapse:collapse">
                                <td style="padding:0;Margin:0;font-size:13px">NAME</td>
                                <td style="padding:0;Margin:0;width:60px;font-size:13px;line-height:13px;text-align:center">QTY</td>
                                <td style="padding:0;Margin:0;width:100px;font-size:13px;line-height:13px;text-align:center">PRICE</td>
                               </tr>
                             </table></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table><!--[if mso]></td></tr></table><![endif]--></td>
                   </tr>
                   
                   <tr style="border-collapse:collapse">
                    <td align="left" style="padding:0;Margin:0;padding-left:20px;padding-right:20px">
                     <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr style="border-collapse:collapse">
                        <td valign="top" align="center" style="padding:0;Margin:0;width:560px">
                         <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr style="border-collapse:collapse">
                            <td align="center" style="padding:0;Margin:0;padding-bottom:10px;font-size:0">
                             <table width="100%" height="100%" cellspacing="0" cellpadding="0" border="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                               <tr style="border-collapse:collapse">
                                <td style="padding:0;Margin:0;border-bottom:1px solid #efefef;background:#FFFFFF none repeat scroll 0% 0%;height:1px;width:100%;margin:0px"></td>
                               </tr>
                             </table></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                              
                   ${productsHtmlArr.join('')}
                   
                   <tr style="border-collapse:collapse">
                    <td class="esdev-adapt-off" align="left" style="Margin:0;padding-top:20px;padding-left:20px;padding-right:20px;padding-bottom:30px">
                     <table cellpadding="0" cellspacing="0" class="esdev-mso-table" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;width:560px">
                       <tr style="border-collapse:collapse">
                        <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                         <table cellpadding="0" cellspacing="0" class="es-left" align="left" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:left">
                           <tr style="border-collapse:collapse">
                            <td align="left" style="padding:0;Margin:0;width:409px">
                             <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                               <tr style="border-collapse:collapse">
                                <td align="right" style="padding:0;Margin:0"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:27px;color:#333333;font-size:18px"><strong>Order Total:</strong></p></td>
                               </tr>
                             </table></td>
                           </tr>
                         </table></td>
                        <td style="padding:0;Margin:0;width:20px"></td>
                        <td class="esdev-mso-td" valign="top" style="padding:0;Margin:0">
                         <table cellpadding="0" cellspacing="0" class="es-right" align="right" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;float:right">
                           <tr style="border-collapse:collapse">
                            <td align="left" style="padding:0;Margin:0;width:131px">
                             <table cellpadding="0" cellspacing="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                               <tr style="border-collapse:collapse">
                                <td align="right" style="padding:0;Margin:0;padding-right:20px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:27px;color:#ff9140;font-size:18px"><strong>$${totalSum}</strong></p><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#ff9140;font-size:14px;display:none"><br></p></td>
                               </tr>
                             </table></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             
             <table cellpadding="0" cellspacing="0" class="es-footer" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;table-layout:fixed !important;width:100%;background-color:transparent;background-repeat:repeat;background-position:center top">
               <tr style="border-collapse:collapse">
                <td align="center" style="padding:0;Margin:0">
                 <table class="es-footer-body" cellspacing="0" cellpadding="0" align="center" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px;background-color:#FEF5E4;width:600px">
                   <tr style="border-collapse:collapse">
                    <td align="left" bgcolor="#EAEAEA" style="padding:20px;Margin:0;background-color:#eaeaea">
                     <table cellspacing="0" cellpadding="0" width="100%" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                       <tr style="border-collapse:collapse">
                        <td class="es-m-p0r" valign="top" align="center" style="padding:0;Margin:0;width:560px">
                         <table width="100%" cellspacing="0" cellpadding="0" style="mso-table-lspace:0pt;mso-table-rspace:0pt;border-collapse:collapse;border-spacing:0px">
                           <tr style="border-collapse:collapse">
                            <td class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:30px;color:#6c5fbc;font-size:20px"><strong>Any questions? We're here to help you!</strong></p></td>
                           </tr>
                           <tr style="border-collapse:collapse">
                            <td class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-bottom:5px;padding-top:10px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:27px;color:#333333;font-size:18px;margin-bottom:6px;">Just contact us:</p></td>
                           </tr>
                           <tr style="border-collapse:collapse">
                            <td class="es-m-txt-c" align="center" style="padding:0;Margin:0;padding-top:5px"><p style="Margin:0;-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;font-family:arial, 'helvetica neue', helvetica, sans-serif;line-height:21px;color:#333333;font-size:14px">+38 (063)123-45-67<br><a target="_blank" href="mailto:eatly.supp@gmail.com" style="-webkit-text-size-adjust:none;-ms-text-size-adjust:none;mso-line-height-rule:exactly;text-decoration:underline;color:#6c5fbc;font-size:14px;">eatly.supp@gmail.com</a></p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table></td>
           </tr>
         </table>
        </div>
       </body>
      </html>`
};