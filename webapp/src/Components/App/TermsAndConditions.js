import React, { PureComponent } from "react";
// import { Scrollbars } from "react-custom-scrollbars-2";
import _ from "lodash";
import Config from "../../Utils/Config";
const R = require("ramda");
class TermsAndConditions extends PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			htmlTag: null,
			showLoader: true,
			agreeBtnDisable: true,
		};
	}
	createMarkup = () => {
		if (this.state.htmlTag) {
			return { __html: this.state.htmlTag };
		}
	};

	componentDidMount() {
		if (this.props.selectedDomain?.tncUrl) {
			this.fetchHtmlData();
		} else {
			this.setState({
				showLoader: false,
			});
		}
	}

	fetchHtmlData = () => {
		if (this.props.selectedDomain?.tncUrl) {
			let tncUrl =
				R.prop("contentURL", Config) + this.props.selectedDomain.tncUrl;
			this.setState(
				{
					showLoader: true,
				},
				() => {
					this.fetchHtml(tncUrl);
				}
			);
		}
	};

	componentDidUpdate(prevProps) {
		if (!_.isEqual(this.props.selectedDomain, prevProps.selectedDomain)) {
			this.fetchHtmlData();
		}
	}

	fetchHtml = (tncUrl) => {
		fetch(tncUrl)
			.then((res) => res.text())
			.then((resp) => {
				this.setState({
					htmlTag: resp,
					showLoader: false,
				});
			})
			.catch((err) => {
				console.log("error ==== html ", err);
				this.setState({
					showLoader: false,
				});
			});
	};

	renderTermsNConditionText = () => {
		if (this.props.selectedDomain?.tncUrl && this.state.htmlTag) {
			return <div dangerouslySetInnerHTML={this.createMarkup()} />;
		} else {
			this.defaultTnC();
		}
	};

	defaultTnC = () => {
		return (
			<div>
				<div>
					<p>
						FrontM (“FrontM,” “our,” “we,” or “us”) having a registered address
						at FrontM Limited, International House, 24, Holborn Viaduct, London,
						EC1A 2BN, United Kingdom, provides data optimized instant messaging,
						enterprise apps, chat AI, offline apps, Internet calling, and other
						services to users around the world. You agree to our Terms of
						Service (“Terms”) by installing, accessing, or using our apps,
						services, features, software, or website (together, “Services”).{" "}
					</p>

					<p>
						IF YOU DO NOT AGREE TO THE TERMS OF THIS END USER LICENSE AGREEMENT
						AND THESE TERMS OF SERVICE (COLLECTIVELY, “AGREEMENT”), DO NOT
						DOWNLOAD, INSTALL, OR USE ANY FrontM SOFTWARE APPLICATIONS OR
						SERVICES, INCLUDING THE FrontM WEBSITE (“WEBSITE”).{" "}
					</p>

					<p>
						BY DOWNLOADING, INSTALLING, OR USING ANY FrontM SOFTWARE
						APPLICATIONS OR SERVICES, YOU AGREE TO ABIDE BY AND COMPLY WITH THIS
						AGREEMENT, AND YOU AFFIRM THAT YOU EITHER ARE OVER THE AGE OF
						MAJORITY IN YOUR JURISDICTION OF RESIDENCE, ARE AN EMANCIPATED
						MINOR, OR POSSESS LEGAL PARENTAL OR GUARDIAN CONSENT, AND THAT YOU
						ARE FULLY ABLE AND COMPETENT TO ENTER INTO THE TERMS, CONDITIONS,
						OBLIGATIONS, AFFIRMATIONS, REPRESENTATIONS, AND WARRANTIES SET FORTH
						IN THIS AGREEMENT.{" "}
					</p>
					<p>
						YOU UNDERSTAND THAT 911 SERVICE IS ONLY PROVIDED BY FrontM IP DESK
						PHONES AND THE FrontM CALL CONTROLLER OR SOFTPHONE ON PCS, AND THE
						OTHER FrontM SOFTWARE APPLICATIONS AND SERVICES DO NOT PROVIDE 911
						SERVICE. IF YOU SUBSCRIBE TO ONE OF THE OTHER FrontM SOFTWARE
						APPLICATIONS OR SERVICES, YOU MUST MAKE ALTERNATIVE ARRANGEMENTS TO
						PLACE 911 CALLS, SUCH AS USING A TRADITIONAL WIRELINE OR CELLULAR
						TELEPHONE, AND YOU SHOULD NOT RELY ON FrontM TO CALL 911.{" "}
					</p>
					<p>
						YOU UNDERSTAND THAT THE FrontM MOBILE APPLICATION USES YOUR DEVICE’S
						DIALER AND CELLULAR TELEPHONE SERVICE TO MAKE 911 CALLS. IF YOUR
						DEVICE DOES NOT HAVE CELLULAR TELEPHONE SERVICE, YOU WILL NOT BE
						ABLE TO CALL 911 FROM THE FrontM MOBILE APPLICATION.{" "}
					</p>
					<p>
						NO ACCESS TO EMERGENCY SERVICES. THERE ARE IMPORTANT DIFFERENCES
						BETWEEN FRONTM AND YOUR MOBILE AND FIXED-LINE TELEPHONE AND SMS
						SERVICES. OUR SERVICES DO NOT PROVIDE ACCESS TO EMERGENCY SERVICES
						OR EMERGENCY SERVICES PROVIDERS, INCLUDING THE POLICE, FIRE
						DEPARTMENTS, OR HOSPITALS, OR OTHERWISE CONNECT TO PUBLIC SAFETY
						ANSWERING POINTS. YOU SHOULD ENSURE YOU CAN CONTACT YOUR RELEVANT
						EMERGENCY SERVICES PROVIDERS THROUGH A MOBILE, FIXED-LINE TELEPHONE,
						OR OTHER SERVICE.
					</p>
					<p>
						This Agreement governs your use of FrontM services (“Services”),
						such as FrontM android and iOS Applications, the FrontM Website, and
						FrontM software applications (“Applications”). This Agreement is
						between FrontM, Inc. and its affiliates (“FrontM”) and the legal
						entity you represent by signing up for any Service, using the
						Service, or downloading, installing, or using any Application
						(“You”). If You are an individual entering this Agreement on behalf
						Your company, You represent and warrant that You have the authority
						and are competent to do so and agree with terms and conditions of
						this end user license agreement.
					</p>
				</div>

				<div>
					<h6 className="terms-head">1. End User License and Restrictions</h6>

					<p>
						FrontM grants You a limited, personal, revocable, non-exclusive,
						non-sublicensable, non-assignable, non-transferable, non-resellable
						license and right to use the FrontM Services and Applications in
						strict accordance with this Agreement. All rights not expressly
						granted under this Agreement are retained by FrontM.
					</p>
					<p>
						No Grant of Intellectual Property Rights. You acknowledge and agree
						that any and all patents, copyrights, trademarks, service marks,
						trade secrets, and all other intellectual property rights
						(collectively, “IP Rights”) in the Applications and Services are and
						shall remain the sole and exclusive property of FrontM and its
						licensors. Nothing in this Agreement intends to or shall grant,
						transfer, or assign any IP Rights to, or vest any IP Rights in, You.
						You are only entitled to the limited use of the rights expressly
						granted to You in this Agreement. You will not take any action to
						jeopardize, limit, or interfere with the IP Rights. You acknowledge
						and agree that any unauthorized use of the IP Rights is a violation
						of this Agreement, as well as a violation of applicable intellectual
						property laws. You acknowledge and understand that all title and
						rights in and to any third party content that may be accessed
						through the Applications or Services is the property of the
						respective content owners and may be protected by applicable
						copyright or other intellectual property laws and treaties.
					</p>
					<p>
						No Grant of Rights to Third Parties and No Resale. You agree not to
						sell, assign, rent, lease, distribute, export, import, act as an
						intermediary or provider, or otherwise grant rights to third parties
						with regard to the Applications or Services or any part thereof
						without FrontM’s prior written consent. If You are interested in
						reselling products or services offered by FrontM, You are encouraged
						to join FrontM’s affiliate network, available here.
					</p>
					<p>
						No Modifications. You agree not to undertake, cause, permit, or
						authorize the modification, creation of derivative works,
						translation, reverse engineering, decompiling, disassembling, or
						hacking of the Applications or Services, or any parts thereof. You
						agree not to intercept, capture, emulate, decrypt, or redirect the
						communications protocols used by FrontM for any purpose, including
						without limitation causing the Applications to connect to any
						computer server or other device not authorized by FrontM or in a
						manner not authorized by FrontM.
					</p>
					<p>
						New Versions of the Software. FrontM, in its sole discretion,
						reserves the right to add, remove, or modify features or functions,
						or to provide fixes, updates and upgrades, to the Applications and
						Services. You acknowledge and agree that FrontM has no obligation to
						make available to You any subsequent versions of the Applications or
						Services. You also agree that You may have to enter into a renewed
						version of this Agreement if you want to download, install, or use a
						new version of the Software. In addition, You and FrontM acknowledge
						that no Third-Party has any obligation whatsoever to furnish
						maintenance or support services with respect to the Applications or
						Services and that FrontM is solely responsible for the provision of
						maintenance and support as provided in this Agreement and to the
						extent such maintenance and support is required under applicable
						law.
					</p>
				</div>

				<div>
					<h6 className="terms-head">2. Service Registration Procedures</h6>
					<p>
						Registration. You must register for our Services using accurate
						data, provide your current mobile phone number, and, if you change
						it, update this mobile phone number using our in-app change number
						feature. You agree to receive text messages and phone calls (from us
						or our third-party providers) with codes to register for our
						Services.
					</p>
					<p>
						Address Book. You provide us the phone numbers of FrontM users and
						your other contacts in your mobile phone address book on a regular
						basis. You confirm you are authorized to provide us such numbers to
						allow us to provide our Services.
					</p>
					<p>
						Age. You must be at least 13 years old to use our Services (or such
						greater age required in your country for you to be authorized to use
						our Services without parental approval). In addition to being of the
						minimum required age to use our Services under applicable law, if
						you are not old enough to have authority to agree to our Terms in
						your country, your parent or guardian must agree to our Terms on
						your behalf.
					</p>
					<p>
						Devices and Software. You must provide certain devices, software,
						and data connections to use our Services, which we otherwise do not
						supply. For as long as you use our Services, you consent to
						downloading and installing updates to our Services, including
						automatically.
					</p>
					<p>
						Fees and Taxes. You are responsible for all carrier data plan and
						other fees and taxes associated with your use of our Services. We
						may charge you for our Services, including applicable taxes. We may
						refuse or cancel orders. We do not provide refunds for our Services,
						except as required by law.
					</p>
				</div>

				<div>
					<h6 className="terms-head">3. Customer Representations</h6>
					<p>
						You represent and warrant that You possess the legal right,
						capacity, and ability to enter into this Agreement. You represent
						and warrant that You have made and will maintain at all times
						wireless or traditional wireline telephone service that will enable
						You to call 911 and any other applicable emergency service number.
						You represent and warrant that You will not use the Applications or
						Services in environments requiring fail-safe performance or in which
						the failure of the Applications or Services could lead directly to
						death, personal injury, or severe physical or environment damage.
						You represent and warrant that the Registration Data, user name,
						contact information, Registered Location(s), and all other
						information provided in connection with Your FrontM Account are true
						and correct at all times. You represent and warrant that You will
						not use the Applications or Services in violation of the Use Policy
						herein.
					</p>

					<p>
						You agree to be financially responsible for Your use of the
						Applications or Services, including the authorized or unauthorized
						use of Your Account.
					</p>
				</div>

				<div>
					<h6 className="terms-head">4. Product Pricing and Availability</h6>

					<p>
						With respect to its advertising, offering, or sale of Applications,
						Services, or any other products (collectively, “Products”), FrontM
						attempts to describe its products as accurately as possible.
						Nevertheless, FrontM does not warrant that any descriptions,
						pricing, availability, or other information relating to the
						advertising, offering, or sale of Products (collectively, “Product
						Information”) from its Website, marketing materials, promotional
						flyers, advertisements, or other printed or electronic materials
						(collectively, “Product Materials”) is accurate, complete, reliable,
						current, or error-free. Despite our efforts, it is possible that
						Product Information may be mispriced, described inaccurately, or
						that the Product may be unavailable. In the event FrontM determines
						that a Product is mispriced, described inaccurately, or unavailable,
						FrontM reserves the right to take any action it deems reasonable and
						necessary to rectify the error, including without limitation,
						canceling Your Account or subscription to the Services. You agree to
						notify FrontM immediately if You become aware of any pricing or
						descriptive errors or inconsistencies with any Products You order
						through the Product Materials and comply with any corrective action
						taken by FrontM.
					</p>

					<p>
						You acknowledge and agree that the Services may not be available
						100% of the time.
					</p>
				</div>

				<div>
					<p>5. Marketing Materials and Promotional Services</p>

					<p>
						From time to time, FrontM may send You marketing materials and offer
						additional promotional services to You at no cost or at an
						additional fee (“Promotional Services”). You hereby agree that
						FrontM may send You (including registered administrators and end
						users of Your Account) such marketing and promotional materials via
						electronic transmission, e-mail, mail, or otherwise, provided, that
						You may unsubscribe to such materials at any time by notifying
						FrontM Customer Support. If You are offered promotional or special
						pricing by FrontM on any of the Services, You agree to keep the
						pricing information strictly confidential and shall not disclose
						such information to any third party without the express written
						consent of FrontM.
					</p>
				</div>

				<div>
					<h6 className="terms-head">6. Use Policies</h6>
					<p>
						You shall not use the Services for any illegal, fraudulent,
						improper, or abusive purpose or in any way that interferes with
						FrontM’s ability to provide high quality Services to other
						customers, prevents or restricts other customers from using the
						Services, or damages any FrontM’s or other customers’ property. If
						FrontM finds that You are using the Services for anything other than
						the permitted uses in this Agreement or for any of the prohibited
						uses in this Agreement, FrontM may at its sole discretion terminate
						Your Service and charge You any applicable fees for the Services
						used plus damages caused by Your improper use. Prohibited uses
						include, but are not limited to: Behavior that is illegal, obscene,
						threatening, harassing, defamatory, libelous, deceptive, fraudulent,
						malicious, infringing, tortious, or invasive of another’s privacy.
					</p>

					<p>
						Sending unsolicited messages or advertisements, including email,
						voicemail, SMS, or faxes (commercial or otherwise) (“spamming”), or
						otherwise sending bulk and/or junk email, voice mail, SMS, or faxes.
					</p>

					<p>
						Harvesting or otherwise collecting information about others,
						including email addresses, without their consent.
						<br />
						Negligently, recklessly, knowingly, or intentionally transmitting
						any material that contains viruses, time bombs, trojan horses,
						worms, malware, spyware, or any other programs that may be harmful
						or dangerous.
					</p>

					<p>
						Creating a false Caller ID identity (“ID spoofing”) or forged
						email/SMS address or header, or otherwise attempting to mislead
						others as to the identity of the sender or the origin of any
						communication made using the Services.
					</p>

					<p>
						Transmitting any material that may infringe, misappropriate, or
						otherwise violate the foreign or domestic intellectual property
						rights or other rights of third parties.
					</p>

					<p>
						Violating any U.K, U.S. or foreign law regarding the transmission of
						technical data or software exported through the Services.
						<br />
						Utilizing the Services in excess of what, in FrontM’s sole
						discretion, would be expected of normal business use.
					</p>

					<p>
						Using the Services in any way that interferes with other customers’
						and third parties’ use and enjoyment of the Services or use the
						Services in any manner which disrupts, prevents or restricts any
						other customer from using the Services.
						<br /> Using or employing methods and/or devices that are designed
						or likely to take advantage of, bypass, exploit, or otherwise avoid
						this Use Policy.
					</p>

					<p>
						Legal and Acceptable Use. You must access and use our Services only
						for legal, authorized, and acceptable purposes. You will not use (or
						assist others in using) our Services in ways that: (a) violate,
						misappropriate, or infringe the rights of FrontM, our users, or
						others, including privacy, publicity, intellectual property, or
						other proprietary rights; (b) are illegal, obscene, defamatory,
						threatening, intimidating, harassing, hateful, racially, or
						ethnically offensive, or instigate or encourage conduct that would
						be illegal, or otherwise inappropriate, including promoting violent
						crimes; (c) involve publishing falsehoods, misrepresentations, or
						misleading statements; (d) impersonate someone; (e) involve sending
						illegal or impermissible communications such as bulk messaging,
						auto-messaging, auto-dialing, and the like; or (f) involve any
						non-personal use of our Services unless otherwise authorized by us.
						You further understand and agree that:
					</p>

					<p>
						You shall be solely liable for any transmissions sent through the
						Services under Your Account, including the content of any
						transmission sent through the Services under Your Account.
					</p>

					<p>
						You will abide by all applicable FrontM policies, procedures, and
						agreements related to the Services.
					</p>

					<p>
						You shall not attempt to gain unauthorized access to the Services,
						other accounts, computer systems or networks connected to the
						Services, through password mining or any other means.
					</p>

					<p>
						Your use of the Services is subject to all applicable local, state,
						national, and international laws and regulations (including without
						limitation those governing account collection, export control,
						consumer protection, unfair competition, anti-discrimination,
						securities laws, and false advertising).
					</p>
				</div>

				<div>
					<h6 className="terms-head">7. Unsolicited Advertisements</h6>

					<p>
						The transmission of unsolicited calls, using the Services for
						broadcasting, and/or transmitting unsolicited fax advertisements is
						illegal under federal law, including the Federal Telephone Consumer
						Protection Act of 1991
						(http://ftp.fcc.gov/cgb/consumerfacts/unwantedfaxes.html), and under
						a number of similar UK laws. Distribution of unsolicited voicemail,
						broadcast, and fax advertisements through the Services is
						prohibited. You shall not use the Services to send or transmit any
						unsolicited communications or advertisements and understand that, if
						You do, FrontM may immediately terminate Your right to use the
						Services without liability of any kind.
					</p>

					<p>
						At FrontM’s sole option and without further notice, FrontM may use
						technologies and procedures, such as filters, that may terminate
						such unsolicited advertisements without delivering them. You hereby
						release and agree to fully, finally, and forever release, hold
						harmless, and fully indemnify FrontM from and against any damages or
						liabilities of any kind related to any voicemail, broadcast, and/or
						fax spam or solicitations that You may send and/or receive using the
						Services.
					</p>

					<p>
						If You transmit or are otherwise connected with any transmission of
						voice, fax, e-mail, or other unsolicited marketing messages using
						the Services, You agree to pay FrontM its actual damages if those
						damages can be reasonably calculated. If actual damages cannot be
						reasonably calculated, You agree to pay FrontM liquidated damages of
						twenty dollars ($20.00) for each unsolicited marketing message
						transmitted through the Services. You acknowledge that if actual
						damages cannot be reasonably calculated, these liquidated damages
						are a reasonable estimation of such damages and are not a penalty.
					</p>
				</div>

				<div>
					<h6 className="terms-head">
						8. Plan Credits, Taxes, Charges, Fees and Chargebacks
					</h6>
					<p>
						Generally. Please note that all prices, taxes, surcharges, and fees
						are subject to change at any time. You are responsible for paying
						all charges for Your Account, including but not limited to toll
						-free, local, long distance, international, additional feature
						charges, 411 and operator assisted charges, and directory assistance
						charges, and for all taxes, surcharges, and fees imposed on you or
						us as a result of your use of the Service. Customers with a past due
						balance on previous or multiple accounts will be charged the full
						balance upon opening a new account or updating their credit card
						information on file. FrontM also reserves the right to charge
						termination and transfer fees consistent with each plan’s terms and
						conditions and as provided in this Agreement.
					</p>

					<p>
						Taxes, Charges, and Fees. All fees for Services advertised or
						otherwise listed on the Website are exclusive of any federal, state,
						local sales, international excise, value-added, and similar taxes or
						fees and administrative or recovery fees or charges (collectively
						“Taxes and Fees”). You agree to pay all Taxes and Fees and/or
						similar liabilities, however denominated, that may now or hereafter
						be levied on the Services which are chargeable to or recoverable
						from customers by any federal, state, local, or international law or
						regulation, as well as any administrative and recovery fees and
						charges levied on the Services by FrontM, whether or not mandated by
						law or regulation. Should FrontM pay or be required to pay such
						liabilities (including any Taxes and Fees that were due but not
						charged or previously collected), You agree that FrontM may charge
						Your credit card on file for such payments upon receipt of an
						invoice and showing of indebtedness to FrontM.
					</p>

					<p>
						You are advised to refer to Your specific plan details regarding all
						domestic and international charges and all other terms and
						conditions of Your plan.
					</p>

					<p>
						Value and Expiration of Plan Credits. Plan Credits, Additional
						Credits, Promotional Credits, and international calling credits have
						no monetary value and cannot be exchanged for the cash value at any
						time after such credits are purchased by You. Any unused Monthly
						Credits expire at the end of the relevant Service month and do not
						“roll over” to the next month. Additional Credits and Promotional
						Credits expire according to the terms of their purchase.
					</p>

					<p>
						Discounts. From time to time in its sole discretion, FrontM may
						offer promotions or discounts. Any promotion or discount codes must
						be provided to FrontM upon purchase of the Services. You shall not
						be entitled to a subsequent credit for such promotions or discounts
						if You do not request such credit at the time of Account creation or
						change of service. Promotions and/or discounts may not be used
						cumulatively or be used for Services retroactively. If a promotion
						and/or discount is offered on a confidential basis, You agree not to
						disclose the promotion and/or discount and to assume full
						responsibility for any harm, direct or indirect, caused to FrontM by
						the disclosure of the promotion and/or discount.
					</p>
				</div>

				<div>
					<h6 className="terms-head">9. Billing and Payment</h6>
					<p>
						Any applicable initiation charges, usage, monthly recurring charges,
						support charges, and other fees are billed in full in advance. Upon
						termination of Your Account for any reason, all unused Plan Credits
						shall expire in their entirety on the termination date. No refund,
						transfer or proration shall be made of any unused credits or of any
						remaining periods/months on any Service plan. Credit card
						authorization may be placed prior to any Plan Credits, Additional
						Credits, Promotional Credits being issued to ensure validity of
						payment method and to hold any excluded charges.
					</p>

					<p>
						When You subscribe to our Paid Services, You will provide us with a
						payment method, such as a valid credit card (including proper
						billing information), and, if applicable, authorize us to collect
						from Your payment method. Any authorization will remain valid until
						thirty (30) days after You terminate our authority to charge Your
						payment method. Upon termination, we will charge You any fees and
						any other outstanding charges and disconnect Your service. You agree
						to advise and notify us of any changes to Your payment method, such
						as credit card account number or expiration date changes. If the
						credit card or other payment method on Your Account is declined or
						fails for any reason, FrontM will use reasonable efforts to contact
						You via email and advise You of the failed billing attempts.
						Notwithstanding the foregoing, FrontM reserves the right to
						disconnect Your Service and terminate Your Account if Your credit
						card on file is declined or fails for any reason, and FrontM
						reserves the right to continue to attempt charging Your credit card
						for any outstanding Service charges and additional fees and pursue
						any other legal remedies available to FrontM. FrontM reserves the
						right to charge a deposit to any account that FrontM considers “high
						risk” or not in good standing.
					</p>

					<p>
						Billing cycle end dates may change from time to time. When a billing
						cycle covers less than or more than a full month, we may make
						reasonable adjustments and prorate the charges to Your Account.
					</p>

					<p>
						You must dispute any charges for the Services in writing to FrontM
						within thirty (30) days of the date of the charge by FrontM. If You
						fail to provide a written statement explaining in reasonable detail
						Your reasons for disputing the charge within such time period, You
						hereby irrevocably waive any objection and further recourse with
						regard to such charges. Written statements disputing charges must be
						sent to support@frontm.com .
					</p>
				</div>

				<div>
					<h6 className="terms-head">10. Storage of User Information</h6>
					<p>
						FrontM is not obligated to store Your communications logs,
						voicemails, faxes, e-mails, or other messages and does so only as a
						convenience to You. You agree that FrontM has no responsibility or
						liability whatsoever for the deletion or failure to store any call
						log information, voicemails, faxes, e- mails, messages, and/or other
						communications maintained or transmitted by the Services. You
						acknowledge and agree that FrontM may establish limits as to the
						size of communications that FrontM transmits or stores and the
						duration for which FrontM stores any communications.
					</p>
				</div>

				<div>
					<h6 className="terms-head">11. Service Changes</h6>
					<p>
						You understand and agree that FrontM may make upgrades or changes to
						the Services which may diminish the functionality of the Services
						without prior notice to You. In the event that a change to the
						Services would, in FrontM’s reasonable discretion and judgment,
						permanently and materially diminish or impair the functionality of
						the Services (a “Change”), you hereby waive any claims relating to
						any sort of damages pertaining or resulting from Change.
					</p>
				</div>

				<div>
					<h6 className="terms-head">12. Publicity Rights</h6>
					<p>
						You agree that FrontM may identify You as a user of the Services in
						its business deals; press releases; marketing materials; electronic,
						printed, and broadcast advertising; newsletters; mailings;
						tradeshows; other promotional materials; on FrontM’s website; or any
						other third-party website where FrontM or its designated agents may
						promote the Services. You hereby grant FrontM and its agents an
						irrevocable, perpetual, worldwide, non-exclusive, fully paid-up,
						royalty-free license (with right to sublicense) to use, reproduce,
						publish, and display Your name, trademarks, service marks, designs,
						logos, and symbols in connection with such purpose.
					</p>
				</div>

				<div>
					<h6 className="terms-head">13. Non-disparagement</h6>
					<p>
						You agree not to directly or indirectly through a third party engage
						in any conduct or make any communication (public or private) that
						disparages FrontM or the Applications or Services in any way. Such
						communications include, but are not limited to, publishing, posting,
						printing, disseminating, or otherwise making such disparaging
						statements on or through the Internet, in any blog, or through any
						other form of social media. You further agree not to solicit or
						encourage, directly or indirectly, any such statements, comments, or
						communications by any third-party. In accordance with the
						termination provisions below, FrontM may terminate Your access to
						the Applications or Services if You breach the requirements of this
						section.
					</p>
				</div>

				<div>
					<h6 className="terms-head">14. Copyright Infringement</h6>
					<p>
						Materials may be made available via the Service by third parties not
						within our control. We are under no obligation to, and do not,
						review content transmitted, sent, or received using the Applications
						or Services for purposes of determining copyright infringement.
						However, FrontM reserves the right to terminate access to its
						Applications or Services if a user infringes on others’ copyrights,
						and will, in appropriate circumstances, terminate access to the
						Applications or Services if FrontM determines that a user is a
						repeat infringer.
					</p>

					<p>
						Pursuant to Title 17, Section 512 of the United States Code and
						under the relevant provisions of United Kingdom Copyright, Designs
						and Patents Act 1988 and equivalent any other national law, all
						claims of copyright infringement for any material You believe to
						reside on FrontM’s Applications or Services should be provided in
						writing to FrontM’s Legal Department at FrontM’s current address as
						posted on FrontM’s Website.
					</p>
				</div>

				<div>
					<h6 className="terms-head">15. Export Restrictions</h6>
					You represent and warrant that (a) You are not located in (and will
					not use the Services or Applications in) a country that is subject to
					U.K. Government embargo, or that has been designated by the U.K.
					Government as a “terrorist supporting” country; and (b) You are not
					listed on any U.K. Government list of prohibited or restricted parties
					relating to exports. You also acknowledge that the Applications and
					Services may be subject to other U.K. and foreign laws and regulations
					governing the export of software by physical or electronic means. You
					agree to comply with all applicable U.K. and foreign laws that apply
					to FrontM as well as end-users end-use, and destination restrictions
					imposed by U.K. and foreign governments.
				</div>

				<div>
					<h6 className="terms-head">16. Indemnification</h6>
					<p>
						To the maximum extent permitted by applicable law, You shall
						indemnify and hold harmless, individually and collectively, FrontM,
						its affiliates, agents, resellers, and other providers who furnish
						goods and services to You in connection with the Services, and their
						officers, directors, managers, employees, and shareholders (the
						“Indemnified Parties”) from and against any and all liability,
						claims, losses (including loss of profits, revenue and goodwill),
						damages, fines, penalties, injuries to persons or property, costs,
						and expenses (including reasonable attorneys’ fees and dispute
						resolution expenses) arising from or related to (1) the use of or
						reliance upon the Applications or Services by You or any third party
						acting upon Your permission, knowledge, authority or direction, (2)
						a breach of this Agreement by You, (3) any negligent acts, omissions
						to act or willful misconduct by You or any third party acting with
						Your permission, knowledge, authority or direction, (4) the
						inability to use the Applications or Services or failure or outage
						of the Applications or Services for any reason, including but not
						limited to those related to calling, “911” or other emergency
						responders, (5) the use of the Applications or Services in
						connection with a violation of any applicable law, code, regulation,
						or ordnance, and/or (6) the misappropriation, breach, violation, or
						infringement of any right, title or interest of any third party,
						including but not limited to, contractual rights, intellectual
						property rights (including patent, trademark, copyright, and trade
						secret rights), rights of privacy, and rights of publicity and
						personality.
					</p>
				</div>

				<div>
					<h6 className="terms-head"> 17. Term</h6>
					<p>
						Your license to the Applications and Services is provided for a term
						specified in Your Services contract (the “Term”) within the FrontM
						mobile app or website user account/profile page. The initial Term
						begins on the date that you sign up for the particular Services (the
						“Date of Start”).
					</p>

					<p>
						The Term for all Service plans will renew automatically for
						successive Terms of the same length without further action by or
						notice to You unless You notify FrontM customer service of
						non-renewal at least thirty (30) days before the end of the then
						current Term, unless otherwise provided in Your Services contract.
					</p>

					<p>
						For avoidance of doubt, the provisions of this Agreement relating to
						intellectual property ownership, customer representations,
						confidentiality, use policies and restrictions, equipment, number
						porting and availability, storage of user information, customer
						feedback, publicity rights, non-disparagement, additional software
						licenses, indemnification, force majeure, warranty disclaimers,
						limitations of liability, notices, assignment, future changes,
						interpretation, dispute resolution and arbitration, and choice of
						law shall survive termination or expiration of this Agreement for
						the maximum term allowable by law.
					</p>
				</div>

				<div>
					<h6 className="terms-head"> 18. Termination</h6>
					<p>
						Monthly Plan Customers. For monthly plan customers, You may cancel
						or terminate Your use of the Services with or without cause at any
						time by accessing cancellation settings within the FrontM control
						panel.
					</p>

					<p>
						Generally. You understand and agree that FrontM may at any time, and
						without additional notice to You, terminate, modify, suspend,
						disconnect, discontinue, or block access to some or all of the
						features of the Application or Services if:
					</p>

					<p>
						FrontM determines that You have materially breached this Agreement.
						<br />
						FrontM determines that You have created or caused to be created
						multiple free accounts.
						<br />
						FrontM determines that You have used a fraudulent credit card to pay
						for Service charges on Your Account.
						<br />
						FrontM determines that You have verbally insulted, abused, or
						harassed any of its employees, contractors, agents, or other
						representatives.
						<br />
						You have failed to respond to FrontM’s calls or email attempts to
						contact You about Your Account.
						<br />
						FrontM determines that You did not or will not reasonably comply or
						cooperate with any applicable law or regulation.
						<br />
						FrontM is ordered by law enforcement or other government agencies to
						suspend or terminate Service to Your Account.
						<br />
						You bring any legal action or proceeding, including without
						limitation in any court, regulatory, or administrative body,
						arbitral body, or mediator, against FrontM, or participate in any
						class action lawsuit against FrontM.
						<br />
						You make any disparaging statement (whether written, oral,
						electronic, or otherwise) against FrontM, its Services, or its
						employees, contractors, agents, investors, affiliates, or other
						representatives.
						<br />
						FrontM determines that such action is necessary to protect,
						maintain, or improve the Services; to prevent fraud or
						misrepresentation by affirmative acts and/or omissions; to protect
						FrontM, its customers, or other third parties affiliated with
						FrontM; or for any other good cause.
					</p>

					<p>
						Upon any termination or suspension of Your Account, FrontM may
						immediately deactivate or delete Your Account and all related
						information and files in Your Account and/or restrict any further
						access to such files, information, or the Applications or Services.
					</p>

					<p>
						FrontM shall not be liable to You or any third party for any reason
						for terminating or suspending Your use or access to the Applications
						or Services.
					</p>

					<p>
						If You or FrontM terminate or suspend Your right to use the
						Services, You shall not be entitled to any refund or pro ration of
						any pre-paid amounts, Plan Credits, international calling credits,
						or other amounts paid to FrontM prior to the termination or
						suspension date.
					</p>
				</div>

				<div>
					<h6 className="terms-head">19. Force Majeure</h6>
					FrontM shall be excused from any delay or failure in performance
					hereunder caused by reason of occurrence or contingency beyond its
					reasonable control, including without limitation, acts of God,
					earthquake, fire, flooding, fiber cuts, actions or inactions of third
					party providers or suppliers, riots, sabotage, war, government
					requirements, or other events that are beyond FrontM’s reasonable
					control.
				</div>

				<div>
					<h6 className="terms-head"> 20. Warranty Disclaimer</h6>

					<p>
						THE SERVICES PROVIDED HEREUNDER ARE PROVIDED “AS IS” AND “AS
						AVAILABLE” AND FrontM MAKES NO WARRANTIES, EXPRESS OR IMPLIED,
						INCLUDING BUT NOT LIMITED TO THE IMPLIED WARRANTIES OF
						MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE AND ANY SIMILAR
						WARRANTY, WHETHER SAID WARRANTY ARISES UNDER PROVISIONS OF ANY LAW
						OF THE UNITED KINGDOM, UNITED STATES OR ANY STATE THEREOF OR ANY
						COUNTRY. FrontM MAKES NO REPRESENTATIONS OR WARRANTIES THAT THE
						SERVICES ARE FREE OF RIGHTFUL CLAIMS OF ANY THIRD PARTY FOR
						INFRINGEMENT OR MISAPPROPRIATION OF INTELLECTUAL PROPERTY OR OTHER
						PROPRIETARY RIGHTS (INCLUDING PATENT AND TRADE SECRET RIGHTS). THE
						ENTIRE RISK ASSOCIATED WITH THE USE OF THE SERVICES SHALL BE BORNE
						SOLELY BY YOU.
					</p>

					<p>
						FrontM MAKES NO WARRANTY ON UP-TIME, RESPONSE TIMES, LATENCY,
						MEAN-TIME BETWEEN FAILURES, QUALITY OF SERVICE, AND/OR QUALITY OF
						VOICE OR FAX COMMUNICATIONS. FrontM EXPRESSLY DISCLAIMS ANY WARRANTY
						THAT THE SERVICES ARE APPROPRIATE FOR HIGH-RISK OR OTHER ACTIVITIES
						WHERE FAILURE OF THE SERVICE COULD RESULT IN SERIOUS HARM TO PERSONS
						OR PROPERTY.
					</p>

					<p>
						FrontM MAKES NO WARRANTY THAT THE SERVICES WILL MEET YOUR
						REQUIREMENTS, OR THAT THE SERVICES WILL BE UNINTERRUPTED, TIMELY,
						SECURE, ERROR FREE OR THAT ANY DEFECTS IN THE SERVICES WILL BE
						CORRECTED. FrontM IS NOT RESPONSIBLE FOR MESSAGES OR INFORMATION
						LOST OR MISDIRECTED DUE TO INTERRUPTIONS OR FLUCTUATIONS IN THE
						SERVICES OR THE INTERNET IN GENERAL. FrontM IS NOT RESPONSIBLE FOR
						THE CONTENT OR FUNCTIONALITY OF ANY THIRD PARTY NETWORK USED IN
						CONNECTION WITH THE SERVICES.
					</p>

					<p>
						FrontM DOES NOT WARRANT THE ACCURACY OR RELIABILITY OF THE RESULTS
						OBTAINED THROUGH USE OF THE SERVICES OR ANY DATA OR INFORMATION
						DOWNLOADED OR OTHERWISE OBTAINED OR ACQUIRED THROUGH THE USE OF THE
						SERVICES. YOU ACKNOWLEDGE THAT ANY DATA OR INFORMATION DOWNLOADED OR
						OTHERWISE OBTAINED OR ACQUIRED THROUGH THE USE OF THE SERVICES ARE
						AT YOUR SOLE RISK AND DISCRETION AND FrontM WILL NOT BE LIABLE OR
						RESPONSIBLE FOR ANY DAMAGE TO YOU OR YOUR PROPERTY.
					</p>

					<p>
						NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU
						FROM FrontM, ITS EMPLOYEES, RESELLERS, PARTNERS, OR AFFILIATES OR
						THROUGH OR FROM THE SERVICES SHALL CREATE ANY WARRANTY NOT EXPRESSLY
						STATED IN THESE TERMS AND CONDITIONS. ALTHOUGH EVERY EFFORT IS MADE
						TO ENSURE THAT VOICEMAILS AND FAX TRANSMISSIONS ARE SECURE, FrontM
						MAKES NO GUARANTEES OF SECURITY.
					</p>

					<p>
						SOME JURISDICTIONS DO NOT PERMIT THE DISCLAIMER OF CERTAIN IMPLIED
						WARRANTIES, SO CERTAIN OF THE FOREGOING DISCLAIMERS MAY NOT APPLY TO
						YOU. TO THE EXTENT THAT FrontM CANNOT DISCLAIM ANY SUCH WARRANTY AS
						A MATTER OF APPLICABLE LAW, THE SCOPE AND DURATION OF SUCH WARRANTY
						WILL BE THE MINIMUM PERMITTED UNDER SUCH LAW.
					</p>
				</div>

				<div>
					<h6 className="terms-head">21. Limitation of Liability</h6>
					<p>
						THE FrontM WILL NOT BE LIABLE TO YOU FOR ANY LOST PROFITS OR
						CONSEQUENTIAL, SPECIAL, PUNITIVE, INDIRECT, OR INCIDENTAL DAMAGES
						RELATING TO, ARISING OUT OF, OR IN ANY WAY IN CONNECTION WITH OUR
						TERMS, US, OR OUR SERVICES, EVEN IF THE FrontM OR ITS PARTIES HAVE
						BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. OUR AGGREGATE
						LIABILITY RELATING TO, ARISING OUT OF, OR IN ANY WAY IN CONNECTION
						WITH OUR TERMS, US, OR OUR SERVICES WILL NOT EXCEED THE GREATER OF
						ONE HUNDRED DOLLARS ($100) OR THE AMOUNT YOU HAVE PAID US IN THE
						PAST TWELVE MONTHS. THE FOREGOING DISCLAIMER OF CERTAIN DAMAGES AND
						LIMITATION OF LIABILITY WILL APPLY TO THE MAXIMUM EXTENT PERMITTED
						BY APPLICABLE LAW. THE LAWS OF SOME STATES OR JURISDICTIONS MAY NOT
						ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES, SO SOME OR ALL
						OF THE EXCLUSIONS AND LIMITATIONS SET FORTH ABOVE MAY NOT APPLY TO
						YOU. NOTWITHSTANDING ANYTHING TO THE CONTRARY IN OUR TERMS, IN SUCH
						CASES, THE LIABILITY OF THE FrontM WILL BE LIMITED TO THE FULLEST
						EXTENT PERMITTED BY APPLICABLE LAW.
					</p>
				</div>

				<div>
					<h6 className="terms-head">22. Notices</h6>
					<p>
						Notices to You shall be effective on the date sent to Your
						registered electronic mail address when sent by email or, at
						FrontM’s option, three (3) days following the date deposited in
						regular Mail, postage prepaid, and addressed to Your current address
						on Your Account. You are responsible for notifying FrontM of any
						changes in Your contact information or address through Your Account
						settings page or by contacting customer service provided at FrontM
						website.
					</p>

					<p>
						Written notice to FrontM shall be effective when directed to
						FrontM’s Legal Department and received at FrontM’s then-current
						address as posted on FrontM’s Website. Your notice must specify Your
						name, Account information, and security verification question and
						answer. All notices from You to FrontM must be made in writing.
					</p>
				</div>

				<div>
					<h6 className="terms-head">23. Assignment</h6>
					<p>
						FrontM may assign this Agreement and any of its rights and
						obligations hereunder at any time. You may not transfer or assign
						this Agreement or any of Your rights or obligations under this
						Agreement. Any purported transfer or assignment in violation of this
						section is void. Subject to the foregoing, this Agreement shall be
						binding on and inure to the benefit of the parties, their
						successors, permitted assigns, and legal representatives.
					</p>{" "}
				</div>

				<div>
					<h6 className="terms-head">24. Future Changes to this Agreement</h6>
					<p>
						We may change the terms of this Agreement from time to time upon
						delivery of electronic or written notices to You. FrontM generally
						provides written notice of changes to Your account, including this
						Agreement and any other legal agreements, via email, electronic
						notice on the FrontM Website or Your Account Page, or on Your
						billing statements. You agree to carefully read and review each such
						e-mail notice, electronic notice, and billing statement from FrontM
						fully regarding any such notices of changes to Your Account.
					</p>
					<p>
						The modified terms shall replace and supersede all previously agreed
						to electronic and written terms, as well as any prior versions of
						this Agreement. You agree that you are solely responsible for (a)
						making sure that Your registered email account is current and
						functional, (b) checking Your registered email account on a routine
						basis, (c) checking the FrontM Website and Your Account page on a
						routine basis, and (d) making sure that FrontM communications are
						not blocked or rendered undeliverable by You, Your computer, any
						software installed on Your computer, Your Internet service provider,
						or for any other reason.
					</p>{" "}
				</div>

				<div>
					<h6 className="terms-head"> 25. Interpretation of this Agreement</h6>
					<p>
						This Agreement, including the documents incorporated herein,
						constitutes the entire agreement between You and FrontM with respect
						to the Applications and Services and supersedes all prior or
						contemporaneous understandings regarding such subject matter.
					</p>

					<p>
						If any part of this Agreement is held invalid or unenforceable, that
						portion shall be construed to reflect the parties’ original intent,
						and the remaining portions shall remain in full force and effect.
					</p>

					<p>
						Nothing in this Agreement shall be deemed or construed to constitute
						or create employment, partnership, association, joint venture,
						agency, or fiduciary relationship between the parties hereto.
					</p>

					<p>
						The failure of FrontM to exercise or enforce any right or provision
						of this Agreement shall not constitute a waiver of such right or any
						other provision.
					</p>

					<p>
						You agree and acknowledge that any breach of the provisions
						regarding intellectual property ownership contained in this
						Agreement shall cause FrontM irreparable harm and FrontM may obtain
						injunctive relief and seek all other remedies available in law and
						in equity.
					</p>

					<p>
						The section titles in this Agreement are for convenience only and
						have no legal or contractual effect.
					</p>
				</div>

				<div>
					<h6 className="terms-head">
						26. Dispute Resolution and Optional Arbitration
					</h6>
					<p>
						In the event of any dispute, claim, question, or disagreement
						between You and FrontM (“Dispute”), You and FrontM shall first use
						reasonable best efforts to settle the dispute, claim, question, or
						disagreement. To this end, You and an authorized member of FrontM’s
						legal department (or other representative of FrontM designated by
						the legal department) shall consult and negotiate with each other in
						good faith and, recognizing their mutual interests, attempt to reach
						a just and equitable solution satisfactory to both parties. Neither
						You nor FrontM shall file or pursue any Disputes in any court,
						administrative, arbitral, or other adjudicative body prior to
						engaging in such consultations and negotiations.
					</p>

					<p>
						You agree that any Disputes shall be adjudicated in the courts of
						London, United Kingdom. You agree to submit to the exclusive
						jurisdiction of such courts with respect to any Disputes and agree
						not to bring any Disputes in any other court or adjudicative body.
						You hereby consent to venue and personal jurisdiction in such courts
						with respect to such Disputes and irrevocably waive any right that
						You may have to assert that such forum is not convenient or that any
						such court lacks jurisdiction.
					</p>

					<p>
						Notwithstanding the adjudication requirement above, for any Disputes
						involving ten thousand UK pounds (10,000 UK pounds) or less, either
						party may choose to resolve such Dispute through binding,
						non-appearance-based arbitration (i.e., arbitration conducted
						online, through written filings, and/or via teleconference). Such
						arbitration shall be conducted through an established alternative
						dispute resolution provider mutually agreed upon by the parties, and
						any judgment rendered by the arbitrator may be entered in any court
						having jurisdiction. The arbitrator’s decision shall be final and
						legally binding.
						<br />
						In the event of any litigation (including arbitration) between You
						and FrontM, the non-prevailing party shall reimburse the prevailing
						party for all reasonable and documented attorneys’ fees, costs, and
						expenses relating to the Dispute.
					</p>
				</div>

				<div>
					<h6 className="terms-head">27. Choice of Law</h6>
					<p>
						This Agreement and Your use of the Applications and Services shall
						be governed by and construed under the laws of the United Kingdom
						without regard to its conflict of law rules. The United Nations
						Convention on Contracts for the International Sale of Goods does not
						apply to this Agreement or Your sign up or use of the Applications
						or Services.
					</p>
				</div>
			</div>
		);
	};

	handleScroll = (event) => {
		const target = event.target;
		if (target.scrollHeight - target.scrollTop === target.clientHeight) {
			console.log("bottom of the TnC");
			// this.setState({ agreeBtnDisable: false });
		}
	};

	render() {
		if (this.state.showLoader) {
			return (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<img loading="lazy" src="/offlinelms/img/tx-loading.gif" alt="loader" />{" "}
				</div>
			);
		} else
			return (
				<div
					style={{
						backgroundColor: "#fff",
						borderRadius: "0.3rem",
						overflow: "auto",
						// height: "calc(100vh - 100px)",
					}}
				>
					<div className="p-3">
						<h5 className="terms-head">Terms and Conditions</h5>
					</div>
					<hr
						style={{
							borderTop: "1px solid #DDDEE3",
							margin: 0,
						}}
					/>

					<div className="p-4">
						<div
							style={{
								overflowY: "auto",
								minHeight: "200px",
								maxHeight: "calc(100vh - 280px)",
							}}
							// onScroll={this.handleScroll}
						>
							{this.state.htmlTag ? (
								<div dangerouslySetInnerHTML={this.createMarkup()} />
							) : (
								this.defaultTnC()
							)}
						</div>

						<hr
							style={{
								borderTop: "1px solid #DDDEE3",
								margin: "15px 0",
							}}
						/>

						<div className="d-flex justify-content-center">
							<a
								className="btn btn-sm btn-open"
								onClick={this.props.acceptTerms}
								// disabled={this.state.agreeBtnDisable}
							>
								Accept
							</a>
							<a
								className="btn btn-sm btn-install ml-2"
								onClick={this.props.rejectTerms}
							>
								Decline
							</a>
						</div>
					</div>
				</div>
			);
	}
}

export default TermsAndConditions;
