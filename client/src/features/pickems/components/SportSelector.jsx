import { IoAmericanFootballOutline } from "react-icons/io5";
import { IoIosFootball, IoIosTrophy } from "react-icons/io";
import { LiaHockeyPuckSolid } from "react-icons/lia";

const SportSelector = ({ handler }) => {
	return (
		<div className='sportSelector'>
			<div
				className='sportSelector__item'
				onClick={(e) => handler(e)}
				data-sport-name='NFL'>
				<div className='sport__icon'>
					<IoAmericanFootballOutline />
				</div>
				<div className='sport__name'>
					<h4>NFL</h4>
				</div>
			</div>
			<div
				className='sportSelector__item'
				onClick={(e) => handler(e)}
				data-sport-name='XFL'>
				<div className='sport__icon'>
					<IoAmericanFootballOutline />
				</div>
				<div className='sport__name'>
					<h4>XFL</h4>
				</div>
			</div>
			<div
				className='sportSelector__item'
				onClick={(e) => handler(e)}
				data-sport-name='USFL'>
				<div className='sport__icon'>
					<IoAmericanFootballOutline />
				</div>
				<div className='sport__name'>
					<h4>USFL</h4>
				</div>
			</div>
			<div
				className='sportSelector__item'
				onClick={(e) => handler(e)}
				data-sport-name='NCAAF'>
				<div className='sport__icon'>
					<IoAmericanFootballOutline />
				</div>
				<div className='sport__name'>
					<h4>NCAAF</h4>
				</div>
			</div>
			<div
				className='sportSelector__item'
				onClick={(e) => handler(e)}
				data-sport-name='MLS'>
				<div className='sport__icon'>
					<IoIosFootball />
				</div>
				<div className='sport__name'>
					<h4>MLS</h4>
				</div>
			</div>
			<div
				className='sportSelector__item'
				onClick={(e) => handler(e)}
				data-sport-name='NHL'>
				<div className='sport__icon'>
					<LiaHockeyPuckSolid />
				</div>
				<div className='sport__name'>
					<h4>NHL</h4>
				</div>
			</div>
		</div>
	);
};

export default SportSelector;
