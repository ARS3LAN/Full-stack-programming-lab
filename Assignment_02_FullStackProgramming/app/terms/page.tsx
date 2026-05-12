import React from 'react';

export default function TermsPage() {
  return (
    <div className="w-full">
      <div className="text-xs text-blue-600 mb-6 border-b pb-2">
        Home &gt; Payments &gt; <span className="text-gray-600">Terms and Conditions</span>
      </div>

      <h2 className="text-2xl font-bold mb-4 text-slate-800">Terms and Conditions for Sale</h2>

      <div className="bg-gray-100 p-6 md:p-10 mb-10 text-xs text-slate-800 leading-relaxed space-y-6">
        
        <div>
          <h3 className="font-bold text-lg mb-1">General Terms and Conditions</h3>
          <p>Gerneral Terms and conditions for Business, Payment and Delivery for Hot tubs and Spas</p>
        </div>

        <div>
          <h4 className="text-sm text-gray-600 mb-2">1. Interpretation</h4>
          <p>In these conditions of sale:<br/>
          'the Company' means The Edge (Systems) Limited<br/>
          'the Buyer' means the person or firm or Company ordering, buying, hiring or being loaned goods from the Company.<br/>
          'the Goods' means the goods or the services, the subject matter of the relevant order, contract for sale, hire or loan (including any part or parts of them).<br/>
          'the Contract' any contract between the Company and the Buyer for the sale and purchase of the goods incorporating these conditions.</p>
        </div>

        <div>
          <h4 className="text-sm text-gray-600 mb-2">2. Risk and title</h4>
          <p>a) The risk in the products will pass to the customer as soon as they are delivered to the customer<br/>
          b) The Edge will remain the sole and absolute owner of the goods until full payment for them has been received. Until such payment has been received the buyer will hold the goods for The Edge as fiduciary bailee and will store them at its premises separately from its own products or those of any other person and in a manner which makes them identifiable as products of The Edge<br/>
          c) When payment for the products is overdue or the buyer suffers distress or execution to be levied against its effects, makes an arrangement or composition with creditors or, being a corporate body enters into liquidation or has an administrator or receiver appointed for the whole or any part of its undertaking, or being an individual has a receiving order and bankruptcy made against them then<br/>
          d) If the buyer remains in possession of the goods, whether or not they have sold them, the Edge shall be entitled to recover the goods from</p>
        </div>

        <div>
          <h4 className="text-sm text-gray-600 mb-2">3) Charges</h4>
          <p>a) All prices advertised are subject to VAT which is payable in addition by the buyer<br/>
          b) The Edge reserves the right to amend prices as and when necessary and in the case of errors on prices the right to rescind any order and credit back to the buyer any payment received.</p>
        </div>

        <div>
          <h4 className="text-sm text-gray-600 mb-2">4) Payment</h4>
          <p>a) Payment is to be by credit/debit card or cheque, please note that cheques will need to clear before despatch of the goods will be made.<br/>
          b) Credit accounts are available to buyers who have completed an Account Application form and that application has been satisfactorily accepted by The Edge. The Edge's decision on this will be final. Payment terms for credit accounts are strictly nett monthly and The Edge reserves the right to charge interest at 3% per annum above Barclays Bank PLC Base Rate as amended from time to time and will be charged on a daily basis on overdue accounts calculated from the date payment is due until receipt of the payment by The Edge.</p>
        </div>

        <div>
          <h4 className="text-sm text-gray-600 mb-2">5) Delivery</h4>
          <p>a) All published delivery timescales are subject to availability, The Edge will not be liable for any failure to deliver within published timescales this includes loss of interest, revenue or goodwill, or any payments due to a third party in excess of the cost of replacing damaged or defective goods.<br/>
          b) Delivery costs are in addition to the published prices and will be added at checkout stage<br/>
          c) In the event of any damage to the goods upon delivery the buyer must notify The Edge within three working days of delivery and must sign the carriers delivery documentation as damaged, this allows us to claim back from the carrier's insurance policy and then enables us to reimburse the buyer.</p>
        </div>

        <div>
          <h4 className="text-sm text-gray-600 mb-2">6) Force Majeure</h4>
          <p>Neither party shall have any liability to the other for any failure or delay in performing its obligations due to any circumstances wholly or partly beyond its control, such circumstances shall include but not be limited to fire, flood, power failure, mechanical failure, lack or shortage of materials, strike, lockout or any other industrial action.</p>
        </div>

        <div>
          <h4 className="text-sm text-gray-600 mb-2">7) Refunds</h4>
          <p>The Edge will refund any goods which are supplied providing the goods are returned to us in their original condition and packaging in a resaleable state within 14 days of delivery. Delivery charges will not be refunded under any circumstances.</p>
        </div>

        <div>
          <h4 className="text-sm text-gray-600 mb-2">8) General</h4>
          <p>a) No modification or amendment of these terms and conditions shall be valid unless agreed in writing and signed by the duly authorised Representative of both parties.<br/>
          b) All contracts are to be subject to English law</p>
        </div>

      </div>
    </div>
  );
}