Chart.defaults.LineWithLine = Chart.defaults.line
Chart.controllers.LineWithLine = Chart.controllers.line.extend({
	draw: function (ease) {
		Chart.controllers.line.prototype.draw.call(this, ease)

		if (this.chart.tooltip._active && this.chart.tooltip._active.length) {
			var activePoint = this.chart.tooltip._active[0],
				ctx = this.chart.ctx,
				x = activePoint.tooltipPosition().x,
				y = activePoint.tooltipPosition().y,
				topY = this.chart.legend.bottom,
				bottomY = this.chart.chartArea.bottom,
				left = this.chart.chartArea.left,
				right = this.chart.chartArea.right

			// Set line opts
			ctx.save()
			ctx.lineWidth = 1
			ctx.setLineDash([3, 3])
			ctx.strokeStyle = '#FF4949'

			// draw vertical line
			ctx.beginPath()
			ctx.moveTo(x, topY)
			ctx.lineTo(x, bottomY)
			ctx.stroke()

			// Draw horizontal line
			ctx.beginPath()
			ctx.moveTo(left, y)
			ctx.lineTo(right, y)
			ctx.stroke()

			ctx.restore()
		}
	},
})
