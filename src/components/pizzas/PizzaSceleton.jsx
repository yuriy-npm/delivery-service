import ContentLoader from "react-content-loader"

const PizzaSceleton = () => {
    return (
        <ContentLoader
                speed={2}
                width={280}
                height={490}
                viewBox="0 0 280 490"
                backgroundColor="#dbdbdb"
                foregroundColor="#ededed">
                <circle cx="140" cy="140" r="130" />
                <rect x="40" y="290" rx="0" ry="0" width="190" height="20" />
                <rect x="10" y="332" rx="0" ry="0" width="250" height="93" />
                <rect x="7" y="470" rx="0" ry="0" width="80" height="20" />
                <rect x="105" y="445" rx="20" ry="20" width="165" height="45" />
            </ContentLoader>
    )
}

export default PizzaSceleton