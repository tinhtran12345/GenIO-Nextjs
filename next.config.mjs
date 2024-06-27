import { paraglide } from "@inlang/paraglide-next/plugin"
/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
        ignoreBuildErrors: true,
    },
    swcMinify: true,
    // async redirects() {
    //     return [
    //         {
    //             source: "/",
    //             destination: "/dashboard",
    //             permanent: false,
    //         },
    //     ];
    // },
};

export default paraglide({
	paraglide: {
		project: "./project.inlang",
		outdir: "./src/paraglide"
	},
	...nextConfig
});
