import { IoMdCog } from "react-icons/io";

const LoadingLeaguePlaceholder = () => {
	return (
		<div className='currentLeague'>
			<div className='currentLeague__controlBar'>
				<div className='currentLeague__header'></div>
				<div className='currentLeague__settings'>
					<button className='btn btn--inline'>
						<IoMdCog />
					</button>
				</div>
			</div>
			<div className='currentLeague__main'>
				<div className='currentLeague__paper xl'>
					<div className='centeredContainer'>
						<div className='spinner'></div>
					</div>
				</div>
				<div className='currentLeague__paper sm'>
					<div className='currentLeague__members'>
						<div className='centeredContainer'>
							<div className='spinner'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoadingLeaguePlaceholder;
