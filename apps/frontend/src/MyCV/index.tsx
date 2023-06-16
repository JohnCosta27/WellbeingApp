import { Link } from "react-router-dom";

// TODO: update this mindmap to what is required
const mindMapURL = 'https://app.diagrams.net/index.html?tags={}&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio#R7VjfT9swEP5r%2BsiUNKSURygUpg1pWrUBezPxNfFwcpFz6Y%2F99bObS9MQqDam0k7ipfJ9vrN93312r%2B0Fo3RxZUSe3KAE3et7ctELLnr9%2Fml4bD8dsKyAgc9AbJSsIL8BJuoXMOgxWioJRcuREDWpvA1GmGUQUQsTxuC87TZF3d41FzHv6DXAJBIaOm63SlJSocNww%2FsaVJzUO%2Fsez6SidmagSITE%2BQYUXPaCkUGkapQuRqAddzUvVdz4hdn1wQxk9CcBqbzFo6NIzX6MH%2BJvYnT11f90VNNc0LLOGKQlgE00lGCMmdCXDXreoJ8Rc%2BvmW%2FAnEC25fqIktFBCqeZZWCi6s2OPx%2Fcb44vFprGsjYzMchXyIazN%2B3o1ZzRhK6uOi0ozA8mOVXIuoxdJY6jA0kSwhak%2Bi0%2BYGGiLX7gurb0SgCnYw9k4A1qQmrXPIVic8dqvqZ8dcAn%2Fppz9V5TTCjN3s3yF0Dxl0WCZybX1D9X3d159LR5An4voMV4deoTapXMhYSpKTS5ZMvgIXXyKGY1FqrRb6Rr0DEhFgic4Md9nuxsOmTxzr42jUYuiUNF%2B1DfYq%2FqC%2F0Z9%2FqvU572rb6v6TvaqvuODVp%2F3rr4dq2%2B4T%2FXxIWdCl7zTjdt89L0rSq1t8%2BrEN08UwSQXq%2Bzntn1uK4dXBEOw2E5iN2kOCAZhFbKsbe735k0v69cNarLRxw69HfEUdnj6mBEYKKjoMNXcPe9N2FozwWz5p8%2Bw5T%2FD1vGu2Bp02JrglCwyeVRa75%2BxQXBojJ10GDuLhITUPkoHy1r43K18U9aGHda%2BGJyCfcvdd517x0QuHpRWpGD%2F%2FD29p7vkz5rNT%2FTV3Mb%2FHMHlbw%3D%3D';

const MyCV = () => {
	return (
		<div>
			<Link to={mindMapURL} target="_blank">
				<div className="w-full h-full btn btn-primary btn-lg">
					Create a CV MindMap!
				</div>
			</Link>
		</div>
	);

};

export default MyCV;