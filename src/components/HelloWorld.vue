<template>
    <div class="hilo" ref="hilo">
        <van-popup v-model="scorePopup" style="background: none;overflow: initial;">
            <div class="scorePopup">
                <div style="height:40px"></div>
                <div class="time" style="text-align:center">{{gameTime}}s</div>
                <div class="scorePopup-score" style="text-align:center">
                    {{score}}分
                </div>
            </div>
        </van-popup>
    </div>
</template>

<script>
    import Hilo from "hilojs";
    import Game from "../js/game";
    export default {
        name: '',
        data() {
            return {
                game: new Game(),
                scorePopup: false
            };
        },
        watch: {
            gameTime(val) {
                if (val == 0) { //游戏结束
                    setTimeout(() => {
                        this.scorePopup = true;
                    }, 1500);
                }
            }
        },
        computed: {
            score() {
                return this.game.score
            },
            gameTime() {
                return this.game.gameTime
            }
        },
        methods: {
            
        },
        mounted() {
            this.game.page = this.$refs.hilo;
            this.game.init();
        },
 
    }
</script>

<style scoped>
.hilo {
            background-color: rgb(255, 208, 0);
            background-image: url("../assets/score.png");
            background-size: 100% 100%;
            background-repeat: no-repeat;
            position: absolute;
            padding: 0px;
            width: 100%;
            height: 120px;
            top: 0;
            left: 0;
        }

</style>