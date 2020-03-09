//! CLASS: TOOLBAR CONTROLLER

class ToolbarController {
    
    static toolbarControl(name) {
        
        return document.getElementById('toolbar').getElementsByClassName(name)[0]
        
    }
    
    static showSpeedOptions(newState) {
        
        var toolbarOptions = document.getElementsByClassName('speed-option')
        var displaySetting
        
        if (newState) {
            displaySetting = 'inline'
        } else {
            displaySetting = 'none'
        }
        
        for (let toolbarOption of toolbarOptions) {
            toolbarOption.style.display = displaySetting
        }
    }
    
    static showAnimationOptions(newState) {
        
        var toolbarOptions = document.getElementsByClassName('animation-option')
        var displaySetting
        
        if (newState) {
            displaySetting = 'inline'
        } else {
            displaySetting = 'none'
        }
        
        for (let toolbarOption of toolbarOptions) {
            toolbarOption.style.display = displaySetting
        }
    }
    
    static toggleDemo() {
        
        if (typeof this.demoRunning == 'undefined') {
            this.demoRunning = true
        }
        
        if (this.demoRunning) {
            
            OrderFromChaos.stopDemo()
            this.toolbarControl('demo-toggle').innerHTML = 'Start'
            this.toolbarControl('animation-toggle').innerHTML = 'Play'
            this.demoRunning = false
            this.animationRunning = false
            this.showAnimationOptions(true)
            this.showSpeedOptions(false)

        } else {
            
            OrderFromChaos.startDemo()
            this.toolbarControl('demo-toggle').innerHTML = 'Stop'
            this.toolbarControl('animation-toggle').innerHTML = 'Pause'
            this.demoRunning = true
            this.animationRunning = true
            var toolbarOptions = document.getElementsByClassName('animation-options')
            for (let toolbarOption of toolbarOptions) {
                toolbarOption.style.display = 'none'
            }
            
            this.showAnimationOptions(false)
            this.showSpeedOptions(true)
        }
        
    
    }
    
    static toggleAnimation() {
        
        if (typeof this.animationRunning == 'undefined') {
            this.animationRunning = true
        }
        
        if (this.animationRunning) {
            
            OrderFromChaos.pause()
            this.toolbarControl('animation-toggle').innerHTML = 'Play'
            this.animationRunning = false
            this.showSpeedOptions(false)
            
        } else {
            
            OrderFromChaos.play()
            this.toolbarControl('animation-toggle').innerHTML = 'Pause'
            this.animationRunning = true
            this.showSpeedOptions(true)
            
        }
    
    }
    
}

//! CLASS: POINT

class Point {
    
    static distance(a, b) {
        
        const dx = a.x - b.x
        const dy = a.y - b.y
        
        return Math.hypot(dx, dy)
        
    }
    
    constructor(x, y) {
        
        this.x = x
        this.y = y
        
    }
    
    add(otherPoint) {
        
        return new Point(this.x + otherPoint.x, this.y + otherPoint.y)
    }
    
    subtract(otherPoint) {
        
        return new Point(this.x - otherPoint.x, this.y - otherPoint.y)
    }
    
    toString() {
        
        return '(' + this.x.toString() + ', ' + this.y.toString() + ')'
        
    }
    
}

//! CLASS: ORDER FROM CHAOS

class OrderFromChaos {

    //! CLASS METHODS: ANIMATION
    
    static startDemo() {      
        this.instances().forEach((instance) => { instance.startDemo() })
    }
    
    static stopDemo() {
        this.instances().forEach((instance) => { instance.stopDemo() })
    }
    
    static pause() {
        this.instances().forEach((instance) => { instance.pause() })           
    }

    static play() {
        this.instances().forEach((instance) => { instance.play() })
    }
    
    static decreaseSpeed() {
        this.instances().forEach((instance) => { instance.decreaseSpeed() })
    }
    
    static increaseSpeed() {
        this.instances().forEach((instance) => { instance.increaseSpeed() })
    }
    
    //! CLASS METHODS: GEOMETRY
    
    static decreaseLineWidth() {
        this.instances().forEach((instance) => { instance.decreaseLineWidth() })
    }
    
    static increaseLineWidth() {
        this.instances().forEach((instance) => { instance.increaseLineWidth() })
    }
    
    //! CLASS METHODS: VISIBILITY
    
    static toggleStar() {
        this.instances().forEach((instance) => { instance.toggleStar() })
    }
    
    static toggleTriangles() {
        this.instances().forEach((instance) => { instance.toggleTriangles() })
    }
    
    static toggleRects() {
        this.instances().forEach((instance) => { instance.toggleRects() })
    }
    
    static toggleDots() {
        this.instances().forEach((instance) => { instance.toggleDots() })
    }

    //! CLASS METHODS: MANAGING INSTANCES
    
    static instances() {
        
        if (typeof this.instanceList == 'undefined') {
            this.instanceList = []
        }

        return this.instanceList
        
    }
    
    static instance(n) {
        
        return this.instances()[n]
        
    }
    
    static addInstance(instance) {
        
        this.instances().push(instance)
        
    }
    
    //! CLASS METHODS: UTILITIES
    
    static setDebugMode(newState) {
        
        // Sets the debug mode to the new specified state
        
        if (this.debugMode() !== newState) {
        
            this.debug = newState    

            if (this.debug) {
                this.log('Debug mode turned on')
            } else {
                this.log('Debug mode turned off')
            }
            
        }

        this.instances().forEach((instance) => { instance.setDebugMode(newState)
        })
           
    }
    
    static debugMode() {
        
        if (typeof this.debug == 'undefined') {
            return false
        } else {
            return this.debug
        }
        
    }
    
    static log(msg) {
        
        if (this.debugMode()) {
            console.log('OrderFromChaos: ' + msg)                    
        }
        
    }
    
    //! CONSTRUCTOR
    
    constructor(x = 0, y = 0, r = 400, rotationDuration = 10, rotationDirection = 'clockwise') {
        
        this.index = OrderFromChaos.instances().length
        OrderFromChaos.addInstance(this)
        
        this.debug = OrderFromChaos.debugMode()
        
        // Object counts
        this.spokeCount = 7
        this.rectCount = 3
        this.triangleCount = 4
        
        // Main properties
        this.x = x
        this.y = y
        this.r = r
        this.setRotationDuration(rotationDuration)
        this.rotationDirection = rotationDirection
        
        // Graphical properties
        this.starLine = true
        this.starLineWidth = 4
        this.starLineColor = '#ff0'
        this.starFill = false
        this.starFillColor = '#ccc'
        
        this.rectLine = true               
        this.rectLineWidth = 4
        this.rectLineColor = '#00f'
        this.rectFill = false
        this.rectFillColor = '#ccc'

        this.triangleLine = true
        this.triangleLineWidth = 4
        this.triangleLineColor = '#000'
        this.triangleFill = false
        this.triangleFillColor = '#ccc'

        this.dotRadius = 8
        this.dotLine = false
        this.dotLineWidth = 1
        this.dotLineColor = '#000'
        this.dotFill = true
        this.dotFillColor = '#000'
        
        this.initializeSubviews()
        
        this.startDemo()
        
        this.log('Created')
        
    }
    
    //! GEOMETRY
    
    decreaseLineWidth() {
        
        if (this.starLineWidth > 1 ) { this.starLineWidth -= 1 }
        if (this.rectLineWidth > 1 ) { this.rectLineWidth -= 1 }
        if (this.triangleLineWidth > 1 ) { this.triangleLineWidth -= 1 }
        if (this.dotRadius > 1 ) { this.dotRadius -= 1 }
        
        this.draw()
        
    }
    
    increaseLineWidth() {
        
        this.starLineWidth += 1
        this.rectLineWidth += 1
        this.triangleLineWidth += 1
        this.dotRadius += 1
        
        this.draw()
    }
    
    calculateGeometry() {
        
        // Star properties
        this.halfSpokeAngle = 180 / this.spokeCount / 2
        this.starSide = this.r * 2
        this.starOuterRadius = this.starSide / 2
        this.starCenter = new Point(this.starOuterRadius, this.starOuterRadius)
        this.starLeftPoint = this.calculateStarPoint(-4)
        this.starLowerLeftPoint = this.calculateStarPoint(-2)
        this.starLowerRightPoint = this.calculateStarPoint(2)
        this.starLowerMiddlePoint = this.calculateStarPoint(0)
        
        // Triangle properties
        this.triangleWidth = this.calculateTriangleSide() + (this.triangleLineWidth / 4) + this.starLineWidth / 4
        this.triangleHeight = (this.triangleWidth / 2) * Math.sqrt(3)
        this.triangleInnerRadius = (this.triangleWidth / 6) * Math.sqrt(3)
        this.trianglesTopOffset = this.starLowerLeftPoint.y - this.starLeftPoint.y - (this.triangleLineWidth / 4)
        
        // Rect properties
        this.rectWidth = this.starLowerRightPoint.x - this.starLowerLeftPoint.x - this.triangleWidth - this.rectLineWidth * 2
        this.rectHeight = this.trianglesTopOffset - this.rectLineWidth - this.dotRadius
        
    }

    calculateTriangleSide() {
     
        var xDistance = this.starLowerMiddlePoint.x - this.starLowerLeftPoint.x
        var yDistance = this.starLowerMiddlePoint.y - this.starLowerLeftPoint.y
        var xSubtract = yDistance / this.tanFromDegrees(180 - 90 - this.halfSpokeAngle)
        var triangleSide = xDistance - xSubtract
        
        return triangleSide
    }
    
    calculateSideOffsetForLineWidth(angle, lineWidth) {
        
        var widthSection1 = (this.tanFromDegrees(angle / 2) * lineWidth) * -1
        var diagonalLineLength = lineWidth / this.cosFromDegrees(angle / 2)
        var widthSection2 = diagonalLineLength / this.cosFromDegrees(angle)
        
        return widthSection1 + widthSection2
    }
    
    calculateTopOffsetForLineWidth(angle, lineWidth) {
        
        var horizontalLineLength = lineWidth / this.cosFromDegrees(angle / 2)
        var verticalLineLength = this.tanFromDegrees(angle) * horizontalLineLength
        
        return verticalLineLength
    }
    
    tanFromDegrees(degrees) {
        
          return Math.tan(degrees * Math.PI / 180)
          
    }
    
    cosFromDegrees(degrees) {
        
          return Math.cos(degrees * Math.PI / 180)
          
    }
    
    calculateStarPoint(n) {

        var angle = ( Math.PI / this.spokeCount ) * n
        var x = this.starCenter.y + Math.sin(angle) * this.r
        var y = this.starCenter.x + Math.cos(angle) * this.r
    
        return new Point(x, y)
    
    }
    
    calculateStarLineRadiusOffset() {
        var horizontalLineLength = this.cosFromDegrees(this.halfSpokeAngle) * (this.starLineWidth / 2)
        var starRadiusOffset = this.tanFromDegrees(180 - 90 - this.halfSpokeAngle) * horizontalLineLength                       
        return starRadiusOffset
    }

    //! ANIMATION
    
    setRotationDuration(newValue) {
        
        this.log('Setting rotation duration to ' + newValue)
        
        this.rotationDuration = newValue
        this.triangleRotationDuration = this.rotationDuration / 2
        this.starRotationDuration = this.rotationDuration * this.spokeCount
        this.rectsRotationDuration = this.rotationDuration
        this.rectRotationDuration = this.triangleRotationDuration
        this.opacityAnimationDuration = this.rotationDuration * 2
        
    }
    
    startDemo() {
       
        this.demoStopped = false
        
        if (this.isPaused()) {
        
            this.play()    
        
        } else {
            
            this.refreshAnimations()
            
        }
                          
    }
    
    stopDemo() {
        
        this.demoStopped = true
        this.paused = false
        this.clearAnimations()
        
    }
    
    isDemoStopped() {
        
        if (typeof this.demoStopped == 'undefined') {
            return true
        } else {
            return this.demoStopped
        }
        
    }
    
    play() {
        
        this.paused = false
        
        if (this.isDemoStopped()) {
            
            this.setAnimations()
            
        } else {

            this.subviews().forEach((subview) => {
                if (subview.tagName == 'DIV') {
                    subview.style.animationPlayState = 'running'
                }
            })
            
        }
                                    
    }

    pause() {
        
        this.paused = true
        
        this.subviews().forEach((subview) => {
            if (subview.tagName == 'DIV') {
                subview.style.animationPlayState = 'paused'
            }
        })
                
    }
    
    isPaused() {
        
        if (typeof this.paused == 'undefined') {
            return false
        } else {
            return this.paused
        }
        
    }
    
    decreaseSpeed() {
        
        this.setRotationDuration(this.rotationDuration + 3)
        this.refreshAnimations()

    }
    
    increaseSpeed() {

        if (this.rotationDuration > 1) {
            
            if (this.rotationDuration < 4) {
                this.setRotationDuration(1)
            } else {
                this.setRotationDuration(this.rotationDuration - 3)
            }

            this.refreshAnimations()
        
        }
                            
    }
    
    clearAnimations() {
        
        this.subviews().forEach((subview) => {
            if (subview.tagName == 'DIV') {
                subview.style.animation = null
            }
        })
        this.draw()
        
    }
    
    refreshAnimations() {
        
        this.clearAnimations()
        // this.draw()
        var instance = this
        setTimeout(function () { instance.setAnimations() }, 0)
        
    }
    
    setAnimationForSubview(subview, animations) {
        
        var animationDeclaration = ''
        var animationName
        
        // subview.style.animation = null
        
        for (var i = 0; i < animations.length; i++) {
            
            
            
            animationName = animations[i][0]
            
            if (this.demoStopped === false || !animationName.endsWith('opacity')) {

                if (animationDeclaration !== '') {
                    animationDeclaration += ', '    
                }
            
                animationDeclaration += animationName + ' ' + animations[i][1].toString() + 's linear infinite'                            
            }

                
        }
        
        subview.style.animation = animationDeclaration
        
    }
    
    setAnimations() {
        
        // Safari Bug Fix
        this.container.style.top = this.cssLength(this.y + 1)
                
        var clockwise = this.rotationDirection == 'clockwise'
    
        // Set star animation
        if (clockwise) {
            this.setAnimationForSubview(this.starContainer, [
                ['full-spin', this.starRotationDuration],
                ['star-opacity', this.opacityAnimationDuration]
            ])
        } else {
            this.setAnimationForSubview(this.starContainer, [
                ['reverse-full-spin', this.starRotationDuration],
                ['star-opacity', this.opacityAnimationDuration]
            ])
        }
        
        // Set triangles animation
        if (clockwise) {
            this.setAnimationForSubview(this.trianglesContainer, [
                ['full-spin', this.rotationDuration],
                ['triangle-opacity', this.opacityAnimationDuration]
            ])
        } else {
            this.setAnimationForSubview(this.trianglesContainer, [
                ['reverse-full-spin', this.rotationDuration],
                ['triangle-opacity', this.opacityAnimationDuration]
            ])
        }
        
        // Set triangle animation
        for (var i = 0; i < this.triangleCount; i++) {
            
            var triangleContainer = this['triangleContainer' + i]
            
            if (clockwise) {
                this.setAnimationForSubview(triangleContainer, [
                    ['reverse-full-spin', this.triangleRotationDuration]
                ])            
            } else {
                this.setAnimationForSubview(triangleContainer, [
                    ['full-spin', this.triangleRotationDuration]
                ])
            }
            
        }
        
        // Set rects animation
        if (clockwise) {
            this.setAnimationForSubview(this.rectsContainer, [
                ['reverse-full-spin', this.rectsRotationDuration],
                ['rect-opacity', this.opacityAnimationDuration]
            ])                
        } else {
            this.setAnimationForSubview(this.rectsContainer, [
                ['full-spin', this.rectsRotationDuration],
                ['rect-opacity', this.opacityAnimationDuration]
            ])
        }
    
        // Set rect animation
        for (var i = 0; i < this.rectCount; i++) {
            
            var rectContainer = this['rectContainer' + i]
            
            if (clockwise) {
                this.setAnimationForSubview(rectContainer, [
                    ['full-spin', this.rectRotationDuration]
                ])            
            } else {
                this.setAnimationForSubview(rectContainer, [
                    ['reverse-full-spin', this.rectRotationDuration]
                ])
            }
            
        }
        
        // Set dots animation
        if (clockwise) {
            this.setAnimationForSubview(this.dotsContainer, [
                ['full-spin', this.rotationDuration]
            ])                
        } else {
            this.setAnimationForSubview(this.dotsContainer, [
                ['reverse-full-spin', this.rotationDuration]
            ])
        }
        
        // Set dot groups animation
        for (var i = 0; i < this.triangleCount; i++) {
            
            var dotGroupContainer = this['dotGroupContainer' + i]
            
            if (clockwise) {
                this.setAnimationForSubview(dotGroupContainer, [
                    ['reverse-full-spin', this.triangleRotationDuration]
                ])            
            } else {
                this.setAnimationForSubview(dotGroupContainer, [
                    ['full-spin', this.triangleRotationDuration]
                ])
            }
                    
        }

    }
    
    //! VISIBILITY
    
    toggleOpacity(e) {
        
        if (e.style.opacity == '' || e.style.opacity == 1) {
            e.style.opacity = 0            
        } else {
            e.style.opacity = 1
        }
        
    }
    
    toggleStar() {
        
        this.toggleOpacity(this.starContainer)
        
    }
    
    toggleTriangles() {
        
        this.toggleOpacity(this.trianglesContainer)
        
    }
    
    toggleRects() {
        
        this.toggleOpacity(this.rectsContainer)
        
    }
    
    toggleDots() {
        
        this.toggleOpacity(this.dotsContainer)
        
    }
                    
    //! SUBVIEWS
    
    initializeSubviews() {
        
        this.initContainer()
        this.initStar()
        this.initRects()
        this.initTriangles()
        this.initDots()
        this.initMouseRegion()
        
        this.subviews().forEach((view) => {
            if (this.debugMode()) {
                view.classList.add('debug')
            } else {
                view.classList.remove('debug')
            }
        })
        
        this.initialized = true
        
    }
    
    subviewsInitialized() {
        
        if (typeof this.initialized == 'undefined') {
            return false
        } else {
            return this.initialized
        }
        
    }
    
    subviews() {
        
        if (typeof this.subviewList == 'undefined') {
            this.subviewList = []
        }

        return this.subviewList
        
    }
    
    addSubview(superview, view) {
        
        this.subviews().push(view)
        superview.appendChild(view)
        
    }
    
    newContainer(classes = [], id = false) {
     
        var container = document.createElement('div')
        if (id !== false) {
            container.id = id   
        }
        container.style.pointerEvents = 'none'
        
        if (typeof classes == 'string') {
            classes = [classes]    
        }
        
        for (var i = 0; i < classes.length; i++) {
            container.classList.add(classes[i])    
        }
        
        container.classList.add('ofc-container')
        
        return container
           
    }
    
    newCanvas(classes = [], id) {
        
        var canvas = document.createElement('canvas')
        if (id !== false) {
            canvas.id = id   
        }
        canvas.style.pointerEvents = 'none'
        
        if (typeof classes == 'string') {
            classes = [classes]    
        }
        
        for (var i = 0; i < classes.length; i++) {
            canvas.classList.add(classes[i])    
        }
        
        canvas.classList.add('ofc-canvas')
        
        return canvas
        
    }
    
    initContainer() {
        
        // Initialize main container
        this.container = this.newContainer('ofc-main-container', 'ofc-container-' + this.index)
        
        // Add
        this.addSubview(document.body, this.container)
        
    }
    
    initStar() {
        
        // Create star container
        this.starContainer = this.newContainer('ofc-star-container')
        this.starContainer.style.transformOrigin = '50% 50%'     
                            
        // Create canvas for star
        this.starCanvas = this.newCanvas('ofc-star-canvas')
                          
        // Store a reference to star canvas context
        this.starContext = this.starCanvas.getContext('2d')
        
        // Add
        this.addSubview(this.starContainer, this.starCanvas)
        this.addSubview(this.container, this.starContainer)
        
    }
    
    initRects() {
     
        // Create rects container
        this.rectsContainer = this.newContainer('ofc-rects-container')
        this.rectsContainer.style.transformOrigin = '50% 50%'
                        
        for (var i = 0; i < this.rectCount; i++) {
            
            var rectId = i.toString()
            
            // Create rect container
            this['rectContainer' + rectId] = this.newContainer(['ofc-rect-container', 'ofc-rect-container-' + rectId])
            this['rectContainer' + rectId].style.transformOrigin = '50% 50%'
                                          
            // Add
            this.addSubview(this.rectsContainer, this['rectContainer' + rectId])
                                
        }
                                        
        // Add
        this.addSubview(this.container, this.rectsContainer)
     
    }
    
    initTriangles() {
        
        // Create triangles container
        this.trianglesContainer = this.newContainer('ofc-triangles-container')
        this.trianglesContainer.style.transformOrigin = '50% 50%'
                        
        for (var i = 0; i < this.triangleCount; i++) {
            
            var triangleId = i.toString()
            
            // Create triangle container
            this['triangleContainer' + triangleId] = this.newContainer(['ofc-triangle-container', 'ofc-triangle-container-' + triangleId])
            this['triangleContainer' + triangleId].style.transformOrigin = '50% 66.66%'
            
            // Create triangle canvas
            this['triangleCanvas' + triangleId] = this.newCanvas('ofc-triangle-canvas')
            
            // Store reference to canvas context
            this['triangleContext' + triangleId] = this['triangleCanvas' + triangleId].getContext('2d')
            
            // Add
            this.addSubview(this['triangleContainer' + triangleId], this['triangleCanvas' + triangleId])
            this.addSubview(this.trianglesContainer, this['triangleContainer' + triangleId])
                                
        }
                                        
        // Add
        this.addSubview(this.container, this.trianglesContainer)
        
    }
            
    initDots() {
     
        // Create dots container
        this.dotsContainer = this.newContainer('ofc-dots-container')
        this.dotsContainer.style.transformOrigin = '50% 50%'
                        
        for (var i = 0; i < this.triangleCount; i++) {
            
            var dotGroupId = i.toString()
            
            // Create dot-group container
            this['dotGroupContainer' + dotGroupId] = this.newContainer(['ofc-dotgroup-container', 'ofc-dotgroup-container-' + dotGroupId])
            this['dotGroupContainer' + dotGroupId].style.transformOrigin = '50% 66.66%'
                              
            // Create dot-group canvas
            this['dotGroupCanvas' + dotGroupId] = this.newCanvas('ofc-dotgroup-canvas')
            
            // Store reference to canvas context
            this['dotGroupContext' + dotGroupId] = this['dotGroupCanvas' + dotGroupId].getContext('2d')
            
            // Add
            this.addSubview(this['dotGroupContainer' + dotGroupId], this['dotGroupCanvas' + dotGroupId])
            this.addSubview(this.dotsContainer, this['dotGroupContainer' + dotGroupId])
                                
        }
                                        
        // Add
        this.addSubview(this.container, this.dotsContainer)
     
    }
    
    initMouseRegion() {
        
        // Create dots container
        this.mouseRegion = document.createElement('div')
        this.mouseRegion.classList.add('ofc-mouse-region')
        this.mouseRegion.style.pointerEvents = 'auto'
        
        // Initialize mouse down event
        this.mouseRegion.onmousedown = (function(instance) {
            return function() { 
                instance.mouseDown()
            }
        })(this)

        // Add
        this.addSubview(this.container, this.mouseRegion)
        
    }
                
    //! DRAWING
    
    draw() {
        
        this.calculateGeometry()
        
        this.drawContainer()
        this.drawStar()
        this.drawRects()
        this.drawTriangles()
        this.drawDotGroups()
        this.drawMouseRegion()
        
    }
    
    drawContainer() {

        this.container.style.position = 'absolute'
        this.container.style.left = this.cssLength(this.x)
        this.container.style.top = this.cssLength(this.y)
        this.container.style.width = this.cssLength(this.starSide)
        this.container.style.height = this.cssLength(this.starSide)
                    
    }
    
    //! DRAWING STAR
    
    drawStar() {

        this.starContainer.style.opacity = 1                    
        this.starContainer.style.position = 'relative'
        this.starContainer.style.left = 0
        this.starContainer.style.top = 0
        this.starContainer.style.width = this.cssLength(this.starSide)
        this.starContainer.style.height = this.cssLength(this.starSide)

        this.starCanvas.style.position = 'absolute'
        this.starCanvas.width = this.starSide + 10
        this.starCanvas.height = this.starSide + 10

        this.starContext.fillStyle = this.starFillColor
        this.starContext.strokeStyle = this.starLineColor
        this.starContext.lineWidth = this.starLineWidth
        
        this.starContext.clearRect(0, 0, this.starCanvas.width, this.starCanvas.height)
        
        this.drawStarPrimitive(this.starContext, this.starCenter, this.r, this.spokeCount, false, this.starFill)
        this.drawStarPrimitive(this.starContext, this.starCenter, this.r - this.calculateStarLineRadiusOffset(), this.spokeCount, this.starLine, false)
        
    }
    
    //! DRAWING RECTS
    
    drawRects() {
        
        this.rectsContainer.style.opacity = 1
        this.rectsContainer.style.position = 'absolute'
        this.rectsContainer.style.left = 0
        this.rectsContainer.style.top = 0
        this.rectsContainer.style.width = this.cssLength(this.starSide)
        this.rectsContainer.style.height = this.cssLength(this.starSide)
        
        this.drawRect(0, 
            this.starLowerLeftPoint.x + this.rectLineWidth, 
            this.starLowerLeftPoint.y - this.rectHeight - this.rectLineWidth
        )

        this.drawRect(1, 
            this.starLowerLeftPoint.x + this.triangleWidth + this.rectLineWidth, 
            this.starLowerRightPoint.y - this.rectHeight - this.rectLineWidth
            
        )

        this.drawRect(2, 
            this.starLowerLeftPoint.x + (this.triangleWidth / 2) + this.rectLineWidth, 
            this.starLowerLeftPoint.y - this.triangleHeight - this.rectHeight - this.rectLineWidth
        )
                
    }
    
    drawRect(id, x, y) {
     
        var rectContainer = this['rectContainer' + id]
        var rectCanvas = this['rectCanvas' + id]
        var rectContext = this['rectContext' + id]
                        
        rectContainer.style.position = 'absolute'
        rectContainer.style.left = this.cssLength(x)
        rectContainer.style.top = this.cssLength(y)
        rectContainer.style.width = this.cssLength(this.rectWidth)
        rectContainer.style.height = this.cssLength(this.rectHeight)
        if (this.rectLine) {
            rectContainer.style.outline = this.cssLength(this.rectLineWidth) + ' solid ' + this.rectLineColor    
        } else {
            rectContainer.style.outline = null
        }
        
        if (this.rectFill) {
            rectContainer.style.backgroundColor = this.rectFillColor    
        } else {
            rectContainer.style.backgroundColor = null
        }
        
            
    }

    //! DRAWING TRIANGLES
        
    drawTriangles() {
        
        this.trianglesContainer.style.opacity = 1
        this.trianglesContainer.style.position = 'absolute'
        this.trianglesContainer.style.left = 0
        this.trianglesContainer.style.top = 0
        this.trianglesContainer.style.width = this.cssLength(this.starSide)
        this.trianglesContainer.style.height = this.cssLength(this.starSide)
        
        this.drawTriangle(0, 
            this.starLowerLeftPoint.x, 
            this.starLowerLeftPoint.y - this.triangleHeight
        )

        this.drawTriangle(1, 
            this.starLowerRightPoint.x - this.triangleWidth, 
            this.starLowerLeftPoint.y - this.triangleHeight
        )
        
        this.drawTriangle(2, 
            this.starLowerLeftPoint.x, 
            this.starLowerLeftPoint.y - this.triangleHeight - this.trianglesTopOffset
        )
        
        this.drawTriangle(3, 
            this.starLowerRightPoint.x - this.triangleWidth, 
            this.starLowerLeftPoint.y - this.triangleHeight - this.trianglesTopOffset
        )
                                       
    }
    
    drawTriangle(id, x, y) {
        
        var triangleContainer = this['triangleContainer' + id]
        var triangleCanvas = this['triangleCanvas' + id]
        var triangleContext = this['triangleContext' + id]
        
        triangleContainer.style.position = 'absolute'
        triangleContainer.style.left = this.cssLength(x)
        triangleContainer.style.top = this.cssLength(y)
        triangleContainer.style.width = this.cssLength(this.triangleWidth)
        triangleContainer.style.height = this.cssLength(this.triangleHeight)
    
        triangleCanvas.style.position = 'absolute'
        triangleCanvas.width = this.triangleWidth + 10
        triangleCanvas.height = this.triangleHeight + 10
        
        var A = new Point(0, this.triangleHeight)
        var B = new Point(A.x + this.triangleWidth, A.y )
        var C = new Point(this.triangleWidth / 2, 0)
        var M = new Point(C.x, this.triangleHeight - this.triangleInnerRadius)
    
        triangleContext.clearRect(0, 0, triangleCanvas.width, triangleCanvas.height)
                        
        triangleContext.fillStyle = this.triangleFillColor
        triangleContext.strokeStyle = this.triangleLineColor
        triangleContext.lineWidth = this.triangleLineWidth
        
        this.drawTrianglePrimitive(triangleContext, A, B, C, false, this.triangleFill)
        
        var sideOffset = this.calculateSideOffsetForLineWidth(60, this.triangleLineWidth / 2)
        var topOffset = this.calculateTopOffsetForLineWidth(60, this.triangleLineWidth / 2)
        
        var A2 = new Point(A.x + sideOffset, A.y - this.triangleLineWidth / 2)
        var B2 = new Point(B.x - sideOffset, A2.y)
        var C2 = new Point(C.x, C.y +topOffset)
        
        this.drawTrianglePrimitive(triangleContext, A2, B2, C2, this.triangleLine, false)
        
    }
    
    //! DRAWING DOTS
        
    drawDotGroups() {
        
        this.dotsContainer.style.opacity = 1
        this.dotsContainer.style.position = 'absolute'
        this.dotsContainer.style.left = 0
        this.dotsContainer.style.top = 0
        this.dotsContainer.style.width = this.cssLength(this.starSide)
        this.dotsContainer.style.height = this.cssLength(this.starSide)
        
        this.drawDotGroup(0, 
            this.starLowerLeftPoint.x, 
            this.starLowerLeftPoint.y - this.triangleHeight
        )

        this.drawDotGroup(1, 
            this.starLowerRightPoint.x - this.triangleWidth, 
            this.starLowerLeftPoint.y - this.triangleHeight
        )
        
        this.drawDotGroup(2, 
            this.starLowerLeftPoint.x, 
            this.starLowerLeftPoint.y - this.triangleHeight - this.trianglesTopOffset
        )
        
        this.drawDotGroup(3, 
            this.starLowerRightPoint.x - this.triangleWidth, 
            this.starLowerLeftPoint.y - this.triangleHeight - this.trianglesTopOffset
        )
        
    }
    
    drawDotGroup(id, x, y) {
                        
        var sideOffset = this.calculateSideOffsetForLineWidth(60, this.dotRadius)
        var topOffset = this.calculateTopOffsetForLineWidth(60, this.dotRadius)

        var dotGroupWidth = this.triangleWidth + sideOffset * 2
        var dotGroupHeight = this.triangleHeight + topOffset + this.dotRadius
        
        var A = new Point(sideOffset, this.triangleHeight + topOffset)
        var B = new Point(A.x + this.triangleWidth, A.y )
        var C = new Point(this.triangleWidth / 2 + sideOffset, topOffset)
                        
        var dotGroupContainer = this['dotGroupContainer' + id]
        var dotGroupCanvas = this['dotGroupCanvas' + id]
        var dotGroupContext = this['dotGroupContext' + id]

        dotGroupContainer.style.position = 'absolute'
        dotGroupContainer.style.left = this.cssLength(x - sideOffset)
        dotGroupContainer.style.top = this.cssLength(y - topOffset)
        dotGroupContainer.style.width = this.cssLength(dotGroupWidth)
        dotGroupContainer.style.height = this.cssLength(dotGroupHeight)
    
        dotGroupCanvas.style.position = 'absolute'
        dotGroupCanvas.width = dotGroupWidth + 10
        dotGroupCanvas.height = dotGroupHeight + 10
        
        dotGroupContext.clearRect(0, 0, dotGroupCanvas.width, dotGroupCanvas.height)
                            
        dotGroupContext.fillStyle = this.dotFillColor                    
        dotGroupContext.strokeStyle = this.dotLineColor
        dotGroupContext.lineWidth = this.dotLineWidth
        
        this.drawPointPrimitive(dotGroupContext, A, this.dotLine, this.dotFill)
        this.drawPointPrimitive(dotGroupContext, B, this.dotLine, this.dotFill)
        this.drawPointPrimitive(dotGroupContext, C, this.dotLine, this.dotFill)
                        
    }
    
    //! DRAWING MOUSE REGION
    
    drawMouseRegion() {

        this.mouseRegion.style.position = 'absolute'
        this.mouseRegion.style.left = 0
        this.mouseRegion.style.top = 0
        this.mouseRegion.style.width = this.cssLength(this.starSide)
        this.mouseRegion.style.height = this.cssLength(this.starSide)
                    
    }
    
    //! DRAWING PRIMITIVES
    
    drawStarPrimitive(ctx, center, r, n, stroke = true, fill = false) {
    
        this.log('Drawing star at ' + center + ' with radius ' + r)
        
        ctx.beginPath()
        ctx.translate(center.x, center.y)
        ctx.moveTo(0, 0 + r)
        
        for (var i = 0; i < n; i++) {
            
            ctx.rotate(Math.PI / n)
            ctx.lineTo(0, 0 - r)
            ctx.rotate(Math.PI / n)
            ctx.lineTo(0, 0 + r)
            
        }
        
        ctx.closePath()
        
        if (fill) { ctx.fill() }
        if (stroke) { ctx.stroke() }
        
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        
    }

    drawPointPrimitive(ctx, point, stroke = true, fill = false) {
        
        this.log('Drawing point at ' + point + ' with radius ' + this.dotRadius)
        
        ctx.beginPath()
        ctx.arc(point.x, point.y, this.dotRadius, 0, 2 * Math.PI)           
        ctx.closePath()
        
        if (fill) { ctx.fill() }
        if (stroke) { ctx.stroke() }
        
    }
    
    drawCirclePrimitive(ctx, point, r, stroke = true, fill = false) {
        
        this.log('Drawing circle at ' + point + ' with radius ' + r)
        
        ctx.beginPath()
        ctx.arc(point.x, point.y, r, 0, 2 * Math.PI)           
        ctx.closePath()

        if (fill) { ctx.fill() }
        if (stroke) { ctx.stroke() }
        
    }
    
	drawTrianglePrimitive(ctx, a, b, c, stroke = true, fill = false) {
        
        this.log('Drawing triangle with corners at ' + a + ', ' + b + ', ' + c)
        
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.lineTo(c.x, c.y)
        ctx.closePath()

        if (fill) { ctx.fill() }
        if (stroke) { ctx.stroke() }

        
    }
    
    drawRectPrimitive(ctx, a, b, c, d, stroke = true, fill = false) {
        
        this.log('Drawing rect with corners at ' + a + ', ' + b + ', ' + c + ', ' + d)
        
        ctx.beginPath()
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.lineTo(c.x, c.y)
        ctx.lineTo(d.x, d.y)
        ctx.closePath()
 
        if (fill) { ctx.fill() }
        if (stroke) { ctx.stroke() }
        
    }
    
    //! MOUSE EVENTS
       
    mouseDown() {

        var event = window.event
        event.preventDefault()
        
        this.mouseOrigin = new Point(event.clientX, event.clientY)
        
        this.log('Mouse down at ' + this.mouseOrigin)
        
        // Bring container to top
        // this.container.style.zIndex = '1000'
        
        this.mouseRegion.onmouseup = (function(instance) {
            return function() { 
                instance.mouseUp()
            }
        })(this)
        
        this.mouseRegion.onmousemove = (function(instance) {
            return function() { 
                instance.mouseMove()
            }
        })(this)
        
        this.mouseRegion.onmouseout = (function(instance) {
            return function() { 
                instance.mouseOut()
            }
        })(this)

    }
    
    mouseMove() {
        
        var event = window.event
        event.preventDefault()
        
        var mousePosition = new Point(event.clientX, event.clientY)
        this.log('Mouse move to ' + mousePosition)
        
        var mouseDelta = mousePosition.subtract(this.mouseOrigin)
        this.log('Mouse delta: ' + mouseDelta)
        
        var containerPosition = new Point(this.container.offsetLeft, this.container.offsetTop)
        var newContainerPosition = containerPosition.add(mouseDelta)
        
        this.container.style.left = this.cssLength(newContainerPosition.x)
        this.container.style.top = this.cssLength(newContainerPosition.y)
        
        this.mouseOrigin = new Point(event.clientX, event.clientY)
     
        
    }
    
    mouseUp() {
        
        var event = window.event
        event.preventDefault()
        
        var mousePosition = new Point(event.clientX, event.clientY)
        
        this.log('Mouse up at ' + mousePosition)
        
        // Restore automatic z-index
        // this.mouseRegion.style.zIndex = 'auto'
        
        // Clear mouse events
        this.mouseRegion.onmouseup = null
        this.mouseRegion.onmousemove = null
        this.mouseRegion.onmouseout = null
        
    }
        
    mouseOut() {
        
        var event = window.event
        event.preventDefault()
        
        var mousePosition = new Point(event.clientX, event.clientY)
        
        this.log('Mouse out at ' + mousePosition)

        // Restore automatic z-index
        // this.container.style.zIndex = 'auto'

        // Clear mouse events                
        this.mouseRegion.onmouseup = null
        this.mouseRegion.onmousemove = null
        this.mouseRegion.onmouseout = null
        
    }
    
    //! UTILITIES

    setDebugMode(newState) {
        
        // Sets the debug mode to the new specified state
        
        if (this.debugMode() !== newState) {
        
            this.debug = newState    

            if (this.debug) {
                this.log('Debug mode turned on')
            } else {
                this.log('Debug mode turned off')
            }
            
            this.subviews().forEach((view) => {
                if (this.debugMode()) {
                    view.classList.add('debug')
                } else {
                    view.classList.remove('debug')
                }
            })
            
        }
        
    }
         
    debugMode() {
        
        if (typeof this.debug == 'undefined') {
            return false
        } else {
            return this.debug
        }
        
    }
    
    log(msg) {
        
        if (this.debugMode()) {
            console.log('OrderFromChaos.instance(' + this.index + '): ' + msg)
        }
        
    }
    
    cssLength(v) {
        
        return v.toString() + 'px'
        
    }
    
}