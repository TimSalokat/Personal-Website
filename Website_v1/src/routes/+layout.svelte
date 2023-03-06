
<script>

    import { states, consts } from "$stores/Global";

    const colors = [
		"#f3f5f6", // Page BG and form bg 1
		"#e2e5e9", // Hover text color 2
		"#d1d5db", // Seperator color 3
		"#98a1ae", // Form borders and seperator 4
		"#6e7887", // form placeholder, button border, sidebar icons 5
		"#46515d", // Hover bg color 6
		"#3b4754", // Main Text and most icons 7
		"#171b21", // Joker 8
		"#212830", // Joker  9
	]

	const dark_colors = [
		"#212830", // 1 Page and form bg
		"#171b21", // 2 Hover text
		"#3b4754", // 3 Seperator
		"#46515d", // 4 Form Borders and seperators
		"#6e7887", // 5 Form placeholder, button border, sidebar icons 
		"#98a1ae", // 6 Hover bg 
		"#d1d5db", // 7 Main Text and icons
		"#e2e5e9", // 8 Joker
		"#f3f5f6", // 9 Joker
	];

	let displayed_colors;
	$: { if($states.dark_mode == true){displayed_colors = dark_colors}
		else {displayed_colors = colors}
	}

</script>

<div 
class="page_holder"
style="
--accent: #8162DF;

--gray1: {displayed_colors[0]};
--gray2: {displayed_colors[1]};
--gray3: {displayed_colors[2]};
--gray4: {displayed_colors[3]};
--gray5: {displayed_colors[4]};
--gray6: {displayed_colors[5]};
--gray7: {displayed_colors[6]};
--gray8: {displayed_colors[7]};
--gray9: {displayed_colors[8]};
">
    <slot></slot>

</div>

<style lang="scss">
    *{
        font-family: "Rubik";
    }
    .page_holder{
        position: relative;
        padding: 0;
        margin: 0;
        min-width: 100vw;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        background-color: var(--gray1);
        color: var(--gray7);
    }

</style>